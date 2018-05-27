'use strict';

var gImgs = [
    { id: 0, url: './img/ruggeri/ruggeri-1.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 1, url: './img/ruggeri/ruggeri-2.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 2, url: './img/ruggeri/ruggeri-3.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 3, url: './img/ruggeri/ruggeri-4.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 4, url: './img/ruggeri/ruggeri-5.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 5, url: './img/ruggeri/ruggeri-6.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 6, url: './img/ruggeri/ruggeri-7.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 7, url: './img/ruggeri/ruggeri-8.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 8, url: './img/ruggeri/ruggeri-9.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 9, url: './img/ruggeri/ruggeri-10.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 10, url: './img/ruggeri/ruggeri-11.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 11, url: './img/ruggeri/ruggeri-12.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 12, url: './img/ruggeri/ruggeri-13.jpg', fontSize: 55, textTransform: 'uppercase' },
    { id: 13, url: './img/ruggeri/ruggeri-14.jpg', fontSize: 55, textTransform: 'uppercase' },
];

function init() {
    renderImgGrid();
}


function renderImgGrid() {
    var strHtml = '';

    gImgs.forEach(img => {
        strHtml += `<div data-id="${img.id}" style="background-image: url(./${img.url})" onclick="openEditor(${img.id})"></div>`;
    });

    var elImgsGrid = document.querySelector('.imgs-grid');
    elImgsGrid.innerHTML = strHtml;
}

function openEditor(imgId) {
    /*
    var clickedImg = gImgs.find(function (img) {
        return imgId === img.id;
    });
    */
    document.querySelector('.back-to-imgs').style.display = 'initial';
    document.querySelector('.img-gallery').style.display = 'none';
    document.querySelector('.headings').style.display = 'none';
    document.querySelector('.logo').style.display = 'none';
    document.querySelector('#down-arrow').style.display = 'none';
    document.querySelector('.editor').style.display = 'flex';
    document.querySelector('footer').style.position = 'relative';
    document.querySelector('body').style.padding = '0px 0px 0px';



    var up = document.getElementById('upload'),
    text1 = document.getElementById('text1'),
    text2 = document.getElementById('text2'),
    sliderSize = document.getElementById('sliderSize'),
    sliderImage = document.getElementById('sliderImage'),
    file  = document.getElementById('image'),
    canvas = document.getElementById('canvas'),
    uploaded = document.getElementById('uploaded'),
    placeholder_image = document.getElementById('placeholder_image');

    console.log("canvas: "+canvas);

up.addEventListener('click', uploadToImgur);

function uploadToImgur() {
    uploaded.innerHTML = "Please wait, uploading...";
    var img;
    try {
        img = canvas.toDataURL('image/gif', 1.0).split(',')[1];
    } catch(e) {
        img = canvas.toDataURL().split(',')[1];
    }
    $.ajax({
        url: 'https://api.imgur.com/3/upload.json',
        type: 'POST',
        data: {
            type: 'base64',
            name: 'meme.png',
            title: 'Title',
            description: 'Description',
            image: img
        },
        headers: {
            Authorization: 'Client-ID 4b64f0eff077008'
        },
        dataType: 'json'
    }).success(function(data) {
        var l = data.data.link;
        uploaded.innerHTML = '<a href="' + l + '" target="_blank">'
        + l
        + '</a>';
    }).error(function(err) {
        console.error(err);
    });

}   


}

function closeEditor() {
    document.querySelector('.back-to-imgs').style.display = 'none';    
    document.querySelector('.img-gallery').style.display = 'block';
    document.querySelector('.headings').style.display = 'block';
    document.querySelector('.logo').style.display = 'block';
    document.querySelector('#down-arrow').style.display = 'block';
    document.querySelector('.editor').style.display = 'none';
    document.querySelector('footer').style.position = 'fixed';
    document.querySelector('body').style.padding = '0px 0px 45px';
}