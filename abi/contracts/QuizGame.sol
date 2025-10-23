// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract QuizGame is Ownable {
    using Address for address;

    // Constants
    uint256 private constant ONE_DAY = 1 days;
    uint256 public reward = 0.00001 ether;

    // Structures
    struct Question {
        string text;
        string[4] options;
        uint8 correctOption;
    }

    // State variables
    uint256 public questionsCount;
    mapping(uint256 => Question) public questions;
    mapping(address => uint256) public scores;
    mapping(address => uint256) public lastAnswer;
    mapping(address => uint256) public totalAnswered;
    mapping(address => mapping(uint256 => bool)) private _todayPlayed;

    // Events
    event AnswerChecked(address indexed player, bool success);
    event QuestionAdded(uint256 indexed questionId, string questionText);
    event FundsDeposited(address indexed sender, uint256 amount);
    event FundsWithdrawn(address indexed recipient, uint256 amount);

    /**
     * @dev Initializes the contract with the deployer as owner
     */
    constructor() Ownable(msg.sender) {
        // Constructor body can be empty since Ownable handles the initialization
    }

    function addQuestion(
        string memory _text,
        string[4] memory _options,
        uint8 _correctOption
    ) external onlyOwner {
        require(_correctOption < 4, "Invalid option index");
        questions[questionsCount] = Question(_text, _options, _correctOption);
        questionsCount++;
        emit QuestionAdded(questionsCount - 1, _text);
    }

    function deposit() external payable onlyOwner {
        emit FundsDeposited(msg.sender, msg.value);
    }
    function setReward(uint256 _reward) external onlyOwner {
        reward = _reward;
    }

    function getTodayQuestion() public view returns (Question memory) {
        require(questionsCount > 0, "No questions available");
        uint256 today = block.timestamp / ONE_DAY;
        return questions[today % questionsCount];
    }

    function checkAnswer(uint8 _option) external {
        require(_option < 4, "Invalid option selected");
        uint256 today = block.timestamp / ONE_DAY;
        require(!_todayPlayed[msg.sender][today], "Already played today");

        Question memory todayQuestion = getTodayQuestion();
        bool correct = (todayQuestion.correctOption == _option);

        if (correct) {
            scores[msg.sender]++;
            Address.sendValue(payable(msg.sender), reward);
        }

        _todayPlayed[msg.sender][today] = true;
        lastAnswer[msg.sender] = block.timestamp;
        totalAnswered[msg.sender]++;
        emit AnswerChecked(msg.sender, correct);
    }

    function hasPlayedToday(address _player) public view returns (bool) {
        uint256 today = block.timestamp / ONE_DAY;
        return _todayPlayed[_player][today];
    }

    function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient funds");
        payable(owner()).transfer(amount);
        emit FundsWithdrawn(owner(), amount);
    }

    receive() external payable {}
}