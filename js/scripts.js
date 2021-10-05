//Section Scroll Animations (requires scrollmagic)
document.addEventListener('DOMContentLoaded', function () {
    var controller = new ScrollMagic.Controller()
    var elems = document.querySelectorAll('section')

    for (var i = 0; i < elems.length; i++) {
        new ScrollMagic.Scene({
            triggerElement: elems[i],
            triggerHook: 0.85,
            reverse: false,
        })
            .setClassToggle(elems[i], 'section-active')
            .addTo(controller)
    }
})

//LINK KILLER -- Remove after Homepage Design Approval
$(document).ready(function () {
    $('a').click(function (e) {
        e.preventDefault()
    })
})

//Blog Categories (if a selectbox)
let blogCategories = {
    elem: document.querySelector('select#blog_categories'),
    init: function () {
        if (this.elem) {
            this.elem.addEventListener('change', function (e) {
                window.location.href = window.location.href.split('?')[0] + '?category=' + e.target.value
            })
        }
    },
}.init()

//Responsive iFrame
$('iframe[src*="youtube"],iframe[src*="vimeo"]').wrap('<div class="responsive-iframe"/>')

//Accordion
document.addEventListener('DOMContentLoaded', function () {
    let accordion = document.querySelectorAll('.accordion-title')

    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener('click', function () {
            let panel = this.nextElementSibling

            if (panel.style.maxHeight) {
                this.classList.remove('open')
                panel.style.maxHeight = null
                panel.setAttribute('aria-hidden', true)
                panel.setAttribute('aria-expanded', false)
            } else {
                this.classList.add('open')
                panel.style.maxHeight = panel.scrollHeight + 'px'
                panel.setAttribute('aria-hidden', false)
                panel.setAttribute('aria-expanded', true)
            }
        })
    }
})

//Flickity Carousel
$('.carousel .group').flickity({
    cellSelector: '.slide',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 8000,
})

$('.slideshow .container').flickity({
    cellSelector: '.slide',
    wrapAround: true,
    adaptiveHeight: false,
    cellAlign: 'center',
    prevNextButtons: false,
    pageDots: true,
    imagesLoaded: true,
    autoPlay: 5000,
})

let blogWidgetFlickity = $('.blog-widget .group').flickity({
    cellSelector: '.post',
    wrapAround: false,
    adaptiveHeight: false,
    contain: true,
    cellAlign: 'left',
    prevNextButtons: false,
    pageDots: false,
    freeScroll: true,
    imagesLoaded: true,
    selectedAttraction: 0.01,
    friction: 0.2,
})

let blogWidgetFlickitySelectedIndex = 0
const blogWidgetFlickityButton = document.querySelectorAll('.blog-widget-flickity-button')
if (blogWidgetFlickityButton && blogWidgetFlickity) {
    for (let i = 0; i < blogWidgetFlickityButton.length; i++) {
        blogWidgetFlickityButton[i].addEventListener('click', function () {
            const action = blogWidgetFlickityButton[i].dataset.action
            if (action == 'next') {
                blogWidgetFlickity.flickity('next')
            } else {
                blogWidgetFlickity.flickity('previous')
            }
        })
    }

    blogWidgetFlickity.on('change.flickity', function (event, index) {
        const flkty = blogWidgetFlickity.data('flickity')
        const count = flkty.slides.length
        console.log('Index', index)
        console.log('Count', count - 1)
        for (let i = 0; i < blogWidgetFlickityButton.length; i++) {
            const action = blogWidgetFlickityButton[i].dataset.action

            if (action == 'next') {
                if (index >= count - 3) {
                    blogWidgetFlickityButton[i].classList.add('-hidden')
                } else {
                    blogWidgetFlickityButton[i].classList.remove('-hidden')
                }
            }

            if (action == 'previous') {
                if (index == 0) {
                    blogWidgetFlickityButton[i].classList.add('-hidden')
                } else {
                    blogWidgetFlickityButton[i].classList.remove('-hidden')
                }
            }
        }
    })
}

//Universal Tables
$('table').wrap("<div class='universal-table'></div>")

//PDO Page loader
document.addEventListener('DOMContentLoaded', function () {
    let pdoElement = document.getElementById('pdopage')
    if (pdoElement) {
        let loadState = document.createElement('div')
        loadState.classList.add('pdo-loader')
        loadState.setAttribute('aria-hidden', true)
        //loadState.textContent = 'Loading';

        pdoElement.appendChild(loadState)

        if (pdoPage) {
            pdoPage.callbacks['before'] = function (config) {
                document.querySelector('.pdo-loader').classList.add('pdo-loading')
            }
            pdoPage.callbacks['after'] = function (config) {
                document.querySelector('.pdo-loader').classList.remove('pdo-loading')
            }
        }
    }
})
