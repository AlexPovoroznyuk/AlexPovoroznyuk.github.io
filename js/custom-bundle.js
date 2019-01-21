"use strict";

var packHeight;

$(document).ready(function () {
    packHeight = $(".packages__item").innerHeight();
    $(".packages__item-wr").css("height", "calc(" + packHeight + "px + 1.5em)");

    $(".slider-item").each(function () {
        $(".dots").append("<button class=" + $(this).attr("data-name") + " data-go=" + $(this).attr("data-name") + "><span>" + $(this).attr("data-name") + "</span></button>");
    });

    $(".slider-exchanges").slick({
        appendArrows: $(".rt"),
        prevArrow: '<button class="prev"><span><svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="11.6299" width="2" height="16" transform="rotate(45 11.6299 0)" fill="#6D92E1"/><rect x="13.0439" y="21.2129" width="2" height="16" transform="rotate(135 13.0439 21.2129)" fill="#6D92E1"/></svg></span></button>',
        nextArrow: '<button class="next"><span><svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1.73071" y="22.6274" width="2" height="16" transform="rotate(-135 1.73071 22.6274)" fill="#6D92E1"/><rect x="0.31665" y="1.41431" width="2" height="16" transform="rotate(-45 0.31665 1.41431)" fill="#6D92E1"/></svg></span></button>',
        infinite: false,
        speed: 700
    });

    var curSlide = $(".slick-current").attr("data-name");
    $(".slick-current").addClass("cur-animation");
    $("." + curSlide).addClass("active");
    $(".dots button").click(function () {
        var name = $(this).data("go");
        var go = $(".slider-item[data-name=" + name + "]").attr("data-slick-index");
        console.log($(".slider-exchanges[data-name=" + name + "]"));
        console.log(go);
        $(".slider-exchanges").slick("goTo", go);
        $(".dots button").removeClass("active");
        curSlide = $(".slick-current").attr("data-name");
        $("." + curSlide).addClass("active");
    });

    $(".slider-exchanges").on('afterChange', function (event, slick, currentSlide, nextSlide) {
        curSlide = $(".slick-current").attr("data-name");
        $(".dots button").removeClass("active");
        $("." + curSlide).addClass("active");
        $(".slider-item").removeClass("cur-animation");
        $(".slick-current").addClass("cur-animation");
    });

    $(".more-button").click(function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {

            $(".packages__item-wr").css("height", $(".packages__item-wr-inner").innerHeight());
        } else {
            packHeight = $(".packages__item").innerHeight();
            $(".packages__item-wr").css("height", "calc(" + packHeight + "px + 1.5em)");
        }
    });
});

$(window).resize(function () {
    console.log("wfew");
    packHeight = $(".packages__item").innerHeight();
    $(".packages__item-wr").css("height", "calc(" + packHeight + "px + 1.5em)");
    console.log($(".packages__item").innerHeight());
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 0) {
        $(".navigation").addClass("scrolled");
    } else {
        $(".navigation").removeClass("scrolled");
    }
});

var sendForm;
$("form").on("submit", function (e) {
    e.preventDefault();
    sendForm = true;
    $(this).find(".reqiered-field").each(function () {
        console.log($(this).val());
        if ($(this).val() == "") {
            $(this).closest(".input-item").addClass("validation-error");
            $(this).closest(".input-item").find(".error span").html("can't be empty");
            sendForm = false;
        } else if ($(this).attr("name") == "email") {
            if ($(this).val() == "") {
                $(this).closest(".input-item").addClass("validation-error");
                $(this).closest(".input-item").find(".error span").html("can't be empty");
                sendForm = false;
            } else if (!/\S+@\S+\.\S+/.test($(this).val())) {
                console.log(/\S+@\S+\.\S+/.test($(this).val()));
                $(this).closest(".input-item").addClass("validation-error");
                $(this).closest(".input-item").find(".error span").html("invalid email");
                sendForm = false;
            } else {
                $(this).closest(".input-item").removeClass("validation-error");
            }
        } else {
            $(this).closest(".input-item").removeClass("validation-error");
        }
    });
    if (sendForm) {
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function success(data) {
                $(".thk-modal").addClass("active");
                $("body").addClass("modal-open");
                $(this).closest(".form-input").each(function () {
                    $(this).val("");
                });
            },
            error: function error(xhr, err, data) {
                $(".err-modal").addClass("active");
                $("body").addClass("modal-open");
            }
        });
    }
});