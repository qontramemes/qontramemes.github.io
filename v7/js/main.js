'use strict';

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

    // #ToDo: clean this!
    var up = document.getElementById('upload'),
    canvas = document.getElementById('canvas'),
    uploaded = document.getElementById('meme')  ;

    up.addEventListener('click', uploadToImgur);

    function uploadToImgur() {
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
            uploaded.value = l;
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