iconSelect = new IconSelect("my-icon-select", 
    {'selectedIconWidth':64,
    'selectedIconHeight':64,
    'selectedBoxPadding':1,
    'iconsWidth':64,
    'iconsHeight':64,
    'boxIconSpace':1,
    'vectoralIconNumber':9  ,
    'horizontalIconNumber':9});

var icons = [];
icons.push({'iconFilePath':'./assets/img/icons/fearful-face.png', 'iconValue':'1'});
icons.push({'iconFilePath':'./assets/img/icons/flushed-face.png', 'iconValue':'2'});
icons.push({'iconFilePath':'./assets/img/icons/grinning-cat.png', 'iconValue':'3'});
icons.push({'iconFilePath':'./assets/img/icons/grinning-face.png', 'iconValue':'4'});

icons.push({'iconFilePath':'./assets/img/icons/grinning-face-with-big-eyes.png', 'iconValue':'5'});
icons.push({'iconFilePath':'./assets/img/icons/grinning-face-with-sweat.png', 'iconValue':'6'});
icons.push({'iconFilePath':'./assets/img/icons/grinning-squinting-face.png', 'iconValue':'7'});
icons.push({'iconFilePath':'./assets/img/icons/hugging-face.png', 'iconValue':'8'});
icons.push({'iconFilePath':'./assets/img/icons/lying-face.png', 'iconValue':'9'});

iconSelect.refresh(icons);