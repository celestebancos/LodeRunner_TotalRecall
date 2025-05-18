function customLevelPassDialog(
	_level,
	_getGold,
	_guardDead,
	_time,
	_returnBitmap,
	_menuBitmap,
	_nextBitmap,
	_stage,
	_scale,
	_callBack
) {
	var TITLE_TEXT_SIZE = 48 * _scale;
	var ITEM_TEXT_SIZE = 40 * _scale;
	var GOLD_X = 32 * _scale;

	var TITLE_TEXT_COLOR = "white";
	var TITLE_SHADOW_COLOR = "yellow";

	var ITEM_TEXT_COLOR = "white";
	var TIME_NAME_COLOR = "#fad292";
	var SCORE_NAME_COLOR = TIME_NAME_COLOR;

	var TEXT_GAP_Y = ((ITEM_TEXT_SIZE * 2) / 3) | 0;

	var COVER_BACKGROUND_COLOR = "black";

	var BACKGROUND_BORDER_COLOR = "white";
	var BACKGROUND_COLOR = "#5b0680";
	var BACKGROUND_SHADOW = "gold";
	var BACKGROUND_BORDER_SIZE = 8 * _scale;

	var BUTTON_BORDER_SIZE = 8 * _scale;
	var BUTTON_ROUND_RADIUD = 2 + 4 * _scale;
	var BUTTON_BORDER_COLOR = "gold";
	var BUTTON_COLOR = "#eeffff";
	var BUTTON_BACKGROUND_COLOR = BACKGROUND_COLOR;

	var buttonX = _returnBitmap.getBounds().width * _scale,
		buttonY = _returnBitmap.getBounds().height * _scale;

	var titleTextObj, goldTextObj, guardTextObj, timeTextObj;
	var goldObj, guardObj, timeNameObj;
	var scoreNameObj, scoreTextObj;

	var coverBackgroundObj, background1Obj, background2Obj, menuButtonObj;
	var screenX1 = _stage.canvas.width;
	var screenY1 = _stage.canvas.height;

	var menuX, menuY, startX, startY;
	var timeNameX, maxTextSize;
	var menuButton = [];
	var bitmap = [_returnBitmap, _menuBitmap, _nextBitmap];

	var centerX, xOffset, yOffset;

	var levelScore = 0,
		goldPoint = 0,
		guardPoint = 0,
		timePoint = MAX_TIME_COUNT;
	var countTime = 85,
		onePointValue = 100,
		countAddValue = 47;

	init();

	function init() {
		console.log("init");
		initContent();
		coverParentStage();
		creatBackground();
		createContent();
		_stage.enableMouseOver(120);
		_stage.update();
		setTimeout(function () {
			goldScoreCounting(1);
		}, 200);
	}

	function initContent() {
		titleTextObj = new createjs.Text(
			"LEVEL " + ("00" + _level).slice(-3),
			"bold " + TITLE_TEXT_SIZE + "px Helvetica",
			TITLE_TEXT_COLOR
		);
		titleTextObj.shadow = new createjs.Shadow(TITLE_SHADOW_COLOR, 0, 0, 10);

		goldTextObj = new createjs.Text("000", ITEM_TEXT_SIZE + "px Helvetica", ITEM_TEXT_COLOR);

		guardTextObj = new createjs.Text("000", ITEM_TEXT_SIZE + "px Helvetica", ITEM_TEXT_COLOR);

		timeTextObj = new createjs.Text(
			("00" + MAX_TIME_COUNT).slice(-3),
			ITEM_TEXT_SIZE + "px Helvetica",
			ITEM_TEXT_COLOR
		);

		timeNameObj = new createjs.Text("TIME", "bold " + ITEM_TEXT_SIZE + "px Helvetica", TIME_NAME_COLOR);

		scoreNameObj = new createjs.Text("SCORE", "bold " + ITEM_TEXT_SIZE + "px Helvetica", SCORE_NAME_COLOR);
		scoreTextObj = new createjs.Text("000000", ITEM_TEXT_SIZE + "px Helvetica", ITEM_TEXT_COLOR);

		timeNameX = timeNameObj.getBounds().width;
		maxTextSize = scoreNameObj.getBounds().width + scoreTextObj.getBounds().width;
		menuX = maxTextSize + TITLE_TEXT_SIZE * 5;
		menuY = TITLE_TEXT_SIZE * 2 + (ITEM_TEXT_SIZE + TEXT_GAP_Y) * 4 + buttonY * 3;

		startX = ((screenX1 - menuX) / 2) | 0;
		startY = ((screenY1 - menuY) / 2) | 0;
	}

	function coverParentStage() {
		coverBackgroundObj = new createjs.Shape();
		coverBackgroundObj.graphics.beginFill(COVER_BACKGROUND_COLOR).drawRect(0, 0, screenX1, screenY1).endFill();
		coverBackgroundObj.alpha = 0.6;
		_stage.addChild(coverBackgroundObj);
	}

	function creatBackground() {
		background1Obj = new createjs.Shape();
		background1Obj.graphics
			.beginFill(BACKGROUND_BORDER_COLOR)
			.drawRoundRect(startX, startY, menuX, menuY, 8 * _scale)
			.endFill();
		background1Obj.shadow = new createjs.Shadow(BACKGROUND_SHADOW, 3, 3, 5);

		background2Obj = new createjs.Shape();
		background2Obj.graphics
			.beginFill(BACKGROUND_COLOR)
			.drawRoundRect(
				startX + BACKGROUND_BORDER_SIZE,
				startY + BACKGROUND_BORDER_SIZE,
				menuX - BACKGROUND_BORDER_SIZE * 2,
				menuY - BACKGROUND_BORDER_SIZE * 2,
				8 * _scale
			)
			.endFill();
		_stage.addChild(background1Obj, background2Obj);
	}

	function createContent() {
		titleTextObj.x = (startX + (menuX - titleTextObj.getBounds().width) / 2) | 0;
		titleTextObj.y = startY + TITLE_TEXT_SIZE;
		_stage.addChild(titleTextObj);

		var centerGap = 8 * _scale;

		centerX = (startX + menuX / 2) | 0;
		xOffset = centerX;
		yOffset = startY + TITLE_TEXT_SIZE * 3;

		goldObj = drawText(xOffset, yOffset, "@", _stage); //@: gold
		var xOffset = centerX - GOLD_X - centerGap;
		goldObj[0].x = xOffset;
		goldObj[0].alpha = 0;

		goldTextObj.x = centerX + centerGap;
		goldTextObj.y = yOffset;
		goldTextObj.alpha = 0;
		_stage.addChild(goldTextObj);

		yOffset += ITEM_TEXT_SIZE + TEXT_GAP_Y;
		guardObj = drawText(xOffset, yOffset, "#", _stage); //#: trap (陷井)
		guardObj[0].alpha = 0;

		guardTextObj.x = centerX + centerGap;
		guardTextObj.y = yOffset;
		guardTextObj.alpha = 0;
		_stage.addChild(guardTextObj);

		var xOffset = centerX - timeNameX - centerGap;
		yOffset += ITEM_TEXT_SIZE + TEXT_GAP_Y;
		timeNameObj.x = xOffset;
		timeNameObj.y = yOffset;
		timeNameObj.alpha = 0;

		timeTextObj.x = centerX + centerGap;
		timeTextObj.y = yOffset;
		timeTextObj.alpha = 0;
		_stage.addChild(timeNameObj, timeTextObj);

		xOffset = centerX - scoreNameObj.getBounds().width - centerGap;
		yOffset += ITEM_TEXT_SIZE + TEXT_GAP_Y;
		scoreNameObj.x = xOffset;
		scoreNameObj.y = yOffset;
		scoreTextObj.x = centerX + centerGap;
		scoreTextObj.y = yOffset;
		_stage.addChild(scoreNameObj, scoreTextObj);

		yOffset += ITEM_TEXT_SIZE + buttonY; //xOffset for menu button
	}

	function goldScoreCounting(firstTime) {
		var endCount = 0;
		if (firstTime) {
			goldObj[0].alpha = 1;
			goldTextObj.alpha = 1;
			soundPlay("scoreBell");
			if (_getGold <= 0) {
				endCount = 1;
			} else {
				setTimeout(function () {
					goldScoreCounting(0);
				}, countTime);
			}
		} else {
			var addCount = countAddValue,
				endCount = 0;
			if (goldPoint + addCount >= _getGold) {
				endCount = 1;
				addCount = _getGold - goldPoint;
			}
			soundPlay("scoreCount");
			goldPoint += addCount;
			levelScore += addCount * onePointValue;
			goldTextObj.text = ("00" + goldPoint).slice(-3);
			scoreTextObj.text = ("00000" + levelScore).slice(-6);

			if (!endCount) {
				setTimeout(function () {
					goldScoreCounting(0);
				}, countTime);
			}
		}

		if (endCount) {
			setTimeout(function () {
				guardScoreCounting(1);
			}, countTime * 4);
		}
		_stage.update();
	}

	function guardScoreCounting(firstTime) {
		var endCount = 0;
		if (firstTime) {
			guardObj[0].alpha = 1;
			guardTextObj.alpha = 1;
			soundPlay("scoreBell");
			if (_guardDead <= 0) {
				endCount = 1;
			} else {
				setTimeout(function () {
					guardScoreCounting(0);
				}, countTime);
			}
		} else {
			var addCount = countAddValue,
				endCount = 0;
			if (guardPoint + addCount >= _guardDead) {
				endCount = 1;
				addCount = _guardDead - guardPoint;
			}
			soundPlay("scoreCount");
			guardPoint += addCount;
			levelScore += addCount * onePointValue;
			guardTextObj.text = ("00" + guardPoint).slice(-3);
			scoreTextObj.text = ("00000" + levelScore).slice(-6);

			if (!endCount) {
				setTimeout(function () {
					guardScoreCounting(0);
				}, countTime);
			}
		}

		if (endCount) {
			setTimeout(function () {
				timeScoreCounting(1);
			}, countTime * 4);
		}
		_stage.update();
	}

	function timeScoreCounting(firstTime) {
		var endCount = 0;
		if (firstTime) {
			timeNameObj.alpha = 1;
			timeTextObj.alpha = 1;
			soundPlay("scoreBell");
			if (_time >= MAX_TIME_COUNT) {
				endCount = 1;
			} else {
				setTimeout(function () {
					timeScoreCounting(0);
				}, countTime);
			}
		} else {
			var addCount = countAddValue,
				endCount = 0;
			if (timePoint - addCount <= _time) {
				endCount = 1;
				addCount = timePoint - _time;
			}
			soundPlay("scoreCount");
			timePoint -= addCount;
			levelScore += addCount * onePointValue;
			timeTextObj.text = ("00" + timePoint).slice(-3);
			scoreTextObj.text = ("00000" + levelScore).slice(-6);

			if (!endCount) {
				setTimeout(function () {
					timeScoreCounting(0);
				}, countTime);
			}
		}

		if (endCount) {
			soundPlay("scoreEnding");
			setTimeout(function () {
				createButton();
			}, 100);
		}
		_stage.update();
	}

	function createButton() {
		var border, button;

		for (var i = 0; i < 3; i++) {
			menuButton[i] = new createjs.Container();
			border = new createjs.Shape();
			button = new createjs.Shape();

			xOffset = (centerX - buttonX * 3 + ((buttonX * 5) / 2) * i) | 0;

			//id = 0
			border.graphics
				.beginFill(BUTTON_BACKGROUND_COLOR)
				.drawRoundRect(
					-BUTTON_BORDER_SIZE * 2,
					-BUTTON_BORDER_SIZE * 2,
					buttonX + 4 * BUTTON_BORDER_SIZE,
					buttonY + 4 * BUTTON_BORDER_SIZE,
					BUTTON_ROUND_RADIUD
				)
				.endFill();
			//id = 1
			button.graphics
				.beginFill(BUTTON_COLOR)
				.drawRoundRect(
					-BUTTON_BORDER_SIZE,
					-BUTTON_BORDER_SIZE,
					buttonX + BUTTON_BORDER_SIZE * 2,
					buttonY + BUTTON_BORDER_SIZE * 2,
					BUTTON_ROUND_RADIUD
				)
				.endFill();

			//id = 2
			bitmap[i].setTransform(0, 0, _scale, _scale);

			menuButton[i].x = xOffset;
			menuButton[i].y = yOffset;
			menuButton[i].addChild(border, button, bitmap[i]);

			menuButton[i].on("click", buttonClick);
			menuButton[i].on("mouseover", buttonMouseOver);
			menuButton[i].on("mouseout", buttonMouseOut);
			menuButton[i].myId = i;
			_stage.addChild(menuButton[i]);
		}
		_stage.update();
	}

	function buttonClick() {
		removeAllObj();
		_stage.cursor = "default";
		_stage.enableMouseOver(0);
		if (_callBack) _callBack(this.myId);
		//debug(this.myId);
	}

	function buttonMouseOver() {
		var border = this.getChildAt(0);

		border.graphics.clear();
		border.graphics
			.beginFill(BUTTON_BORDER_COLOR)
			.drawRoundRect(
				-BUTTON_BORDER_SIZE * 2,
				-BUTTON_BORDER_SIZE * 2,
				buttonX + BUTTON_BORDER_SIZE * 4,
				buttonY + BUTTON_BORDER_SIZE * 4,
				BUTTON_ROUND_RADIUD
			)
			.endFill();

		_stage.cursor = "pointer";
		_stage.update();
	}

	function buttonMouseOut() {
		var border = this.getChildAt(0);

		border.graphics.clear();
		border.graphics
			.beginFill(BUTTON_BACKGROUND_COLOR)
			.drawRoundRect(
				-BUTTON_BORDER_SIZE * 2,
				-BUTTON_BORDER_SIZE * 2,
				buttonX + BUTTON_BORDER_SIZE * 4,
				buttonY + BUTTON_BORDER_SIZE * 4,
				BUTTON_ROUND_RADIUD
			)
			.endFill();

		_stage.cursor = "default";
		_stage.update();
	}

	function removeAllObj() {
		_stage.removeChild(coverBackgroundObj, background1Obj, background2Obj, titleTextObj);

		_stage.removeChild(goldObj[0], goldTextObj);
		_stage.removeChild(guardObj[0], guardTextObj);
		_stage.removeChild(timeNameObj, timeTextObj);
		_stage.removeChild(scoreNameObj, scoreTextObj);

		for (var i = 0; i < 3; i++) {
			_stage.removeChild(menuButton[i]);
		}
		_stage.update();
	}
}
