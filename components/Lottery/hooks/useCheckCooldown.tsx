import { useEffect, useRef } from 'react';

interface UseCheckCooldownProps {
  checkCooldown: () => boolean | Promise<boolean>;
  onCooldown?: () => void;
  interval?: number;
  enabled?: boolean;
}

/**
 * Custom hook that checks for cooldown status at regular intervals
 * @param checkCooldown Function that returns true if in cooldown, false otherwise
 * @param onCooldown Optional callback to run when cooldown is active
 * @param interval Interval in milliseconds between checks (default: 1000ms)
 * @param enabled Whether to run the interval (default: true)
 */
const useCheckCooldown = ({
  checkCooldown,
  onCooldown,
  interval = 1000,
  enabled = true
}: UseCheckCooldownProps) => {
  // Use ref to track the latest callback without causing effect to re-run
  const latestCallback = useRef(onCooldown);
  
  useEffect(() => {
    latestCallback.current = onCooldown;
  }, [onCooldown]);

  useEffect(() => {
    if (!enabled) return;

    const check = async () => {
      try {
        const inCooldown = await Promise.resolve(checkCooldown());
        if (inCooldown && latestCallback.current) {
          latestCallback.current();
        }
      } catch (error) {
        console.error('Error checking cooldown:', error);
      }
    };

    // Run check immediately
    check();

    // Set up interval
    const id = setInterval(check, interval);

    return () => clearInterval(id);
  }, [checkCooldown, interval, enabled]);
};

export default useCheckCooldown;