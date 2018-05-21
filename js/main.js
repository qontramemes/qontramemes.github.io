'use strict';

// --------------
//  Globals
// --------------

var KEYWORDS = ['ruggeri'];

var gImgs = [
    { id: 0, url: './img/ruggeri/ruggeri-1.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
    { id: 1, url: './img/ruggeri/ruggeri-2.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
    { id: 2, url: './img/ruggeri/ruggeri-3.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
    { id: 3, url: './img/ruggeri/ruggeri-4.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
    { id: 4, url: './img/ruggeri/ruggeri-5.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
    { id: 5, url: './img/ruggeri/ruggeri-6.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
    { id: 6, url: './img/ruggeri/ruggeri-7.jpg', keywords: ['ruggeri'], fontSize: 40, textTransform: 'uppercase' },
];

var gMeme = {
    selectedImgId: null,

    txtTop: {
        align: 'center',
        y: 210,
        isShadow: false,
        fontSize: 20,
        color: 'white',
        textTransform: 'uppercase'
    },
    txtBottom: {
        align: 'center',
        y: 230,
        isShadow: false,
        fontSize: 20,
        color: 'white',
        textTransform: 'uppercase'
    }
}

var gCanvas = {
    canvas: undefined,
    ctx: undefined,
}

// --------------
//  Initiate
// --------------

function init() {
    gCanvas.canvas = document.getElementById('img-canvas');
    gCanvas.ctx = gCanvas.canvas.getContext('2d');
    gCanvas.ctx.save();

    // renderKeywordBtns();
    renderImgGrid();
    // renderSearchKeywords(KEYWORDS);
}

// --------------
//  Gallery Frame
// --------------

function renderImgGrid() {
    var strHtml = '';

    gImgs.forEach(img => {
        strHtml += `<div data-id="${img.id}" style="background-image: url(./${img.url})" onclick="openEditor(${img.id})"></div>`;
    });

    var elImgsGrid = document.querySelector('.imgs-grid');
    elImgsGrid.innerHTML = strHtml;
}

function filterImgs(word) {
    console.log(word);
    var elImgs = document.querySelectorAll('.imgs-grid div');
    elImgs.forEach(function (elImg) {
        var imgObj = gImgs.find(function (img) {
            return +elImg.getAttribute('data-id') === img.id;
        })
        if (word === '') elImg.style.display = 'initial'
        else if (!imgObj.keywords.includes(word)) {
            elImg.style.display = 'none';
        } else {
            elImg.style.display = 'initial';
        }
    })
}

// --------------
//  Editor Frame
// --------------

function openEditor(imgId) {
    // DETAIL
    gCanvas.ctx.restore();
    var clickedImg = gImgs.find(function (img) {
        return imgId === img.id;
    });
    gMeme.img = clickedImg;
    renderCanvas(clickedImg);

    // toggle view
    document.querySelector('.back-to-imgs').style.display = 'initial';
    document.querySelector('.img-gallery').style.display = 'none';
    document.querySelector('.headings').style.display = 'none';
    document.querySelector('.logo').style.display = 'none';
    document.querySelector('#down-arrow').style.display = 'none';
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('footer').style.position = 'relative';
    document.querySelector('body').style.padding = '0px 0px 0px';
}

function closeEditor() {
    // HOME
    // reset design properties
    gCanvas.ctx.restore();
    gMeme.txtTop.shadow = false;
    gMeme.txtTop.fontSize = 40;
    gMeme.txtTop.align = 'center';
    gMeme.txtBottom.shadow = false;
    gMeme.txtBottom.fontSize = 40;
    gMeme.txtBottom.align = 'center';

    // reset inputs value
    document.querySelector(`.edit-buttons-top .input-heading`).value = '';
    document.querySelector(`.edit-buttons-bottom .input-heading`).value = '';

    // reset button groups display && add button
    document.querySelector('.edit-buttons-top').style.display = 'grid';
    document.querySelector('.edit-buttons-bottom').style.display = 'none';
    document.querySelector('.add-heading').style.display = 'initial';

    // toggle view
    document.querySelector('.back-to-imgs').style.display = 'none';    
    document.querySelector('.img-gallery').style.display = 'block';
    document.querySelector('.headings').style.display = 'block';
    document.querySelector('.logo').style.display = 'block';
    document.querySelector('#down-arrow').style.display = 'block';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('footer').style.position = 'fixed';
    document.querySelector('body').style.padding = '0px 0px 45px';
}

// canvas

function renderCanvas(img) {
    if (gCanvas.ctx) {
    gCanvas.ctx.clearRect(0, 0, gCanvas.canvas.width, gCanvas.canvas.height);
    
        var image = new Image();
        image.src = img.url;
        image.onload = function () {
            gCanvas.canvas.height = this.naturalWidth / 1.7;
            gCanvas.canvas.width = this.naturalWidth / 1.7;
            gCanvas.ctx.drawImage(this, 0,0, gCanvas.canvas.width, gCanvas.canvas.height);            
        }
    }
}

function loadImgFromWeb() {
    var imgUrl = document.getElementById('load-img-web-input').value;
    var imgFromWeb = {
        id: gImgs.length,
        url: imgUrl,
        keywords: [],
        fontSize: 40,
    }
    gImgs.push(imgFromWeb);
    openEditor(imgFromWeb.id);
}

// canvas-text

function drawTxts() {
    renderCanvas(gMeme.img);
    drawSpecificTxt('Top');
    // drawSpecificTxt('Bottom');
    
    setTimeout(drawSpecificTxt, 30, 'Bottom');

    function drawSpecificTxt(topOrBottom) {
        var currTxt = gMeme[`txt${topOrBottom}`];
        var inputTxt = document.querySelector(`.edit-buttons-${topOrBottom.toLowerCase()} .input-heading`).value;
        // Font size inside the canvas
        // gCanvas.ctx.fillStyle = currTxt.color;
        
        
        // Text align inside the canvas
        setTimeout(function () {
            var x;
            if (currTxt.align === 'left') {
                x = 0;
            } else if (currTxt.align === 'center') {
                x = 0;
            } else x = 0;
            
            if (currTxt.isShadow) {
                gCanvas.ctx.shadowColor = 'rgba(0,0,0,.5)';
                gCanvas.ctx.shadowOffsetX = 4;
                gCanvas.ctx.shadowOffsetY = 4;
                gCanvas.ctx.shadowBlur = 1;
                gCanvas.ctx.shadow
            } else gCanvas.ctx.shadowColor = 'transparent';
            gCanvas.ctx.font = `${currTxt.fontSize}px tungsten-semibold`;
            gCanvas.ctx.strokeStyle = 'black';
            console.log('currTxt.color', currTxt.color);
            gCanvas.ctx.fillStyle = currTxt.color;
            console.log('fillStyle', gCanvas.ctx.fillStyle);
            gCanvas.ctx.fillText(inputTxt, x, currTxt.y);
            gCanvas.ctx.strokeText(inputTxt, x, currTxt.y);
        }, 20)
    }
}

function deleteCanvasTxt(selector) {
    renderCanvas(gMeme.img);
    if (selector === 'edit-buttons-top') gMeme.txtTop.align = 'left'
    else gMeme.txtBottom.align = 'left'
    
    var elEditBtns = document.querySelector(`.${selector}`);
    var inputHeading = document.querySelector(`.${selector} .input-heading`);
    elEditBtns.style.display = 'none';
    inputHeading.value = '';
    document.querySelector('.add-heading').style.display = 'initial';

    drawTxts();    
}

function canvasChangeTxtSize(selector, num) {
    console.log(selector, num);
    var inputTxt = document.querySelector(`.edit-buttons-${selector.toLowerCase()} .input-heading`).value;
    console.log(gMeme[`txt${selector}`].fontSize);
    if (gMeme[`txt${selector}`].fontSize < 2) gMeme[`txt${selector}`].fontSize += 8;
    gMeme[`txt${selector}`].fontSize += num;
    drawTxts();
}

function canvasTxtColor(txtColor, bottomOrTop) {
    gMeme[`txt${bottomOrTop}`].color = txtColor;
    console.log(gMeme);
    drawTxts();
}

function toggleShadow(topOrBottom) {
    var currTxt = gMeme[`txt${topOrBottom}`];
    if (currTxt.isShadow) currTxt.isShadow = false
    else currTxt.isShadow = true;
    drawTxts();
}

// edit buttons

function downloadCanvas(link) {
    link.href = gCanvas.canvas.toDataURL();
    drawTxts();
    link.download = 'tenLoPadding.jpeg';
}