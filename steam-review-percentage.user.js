// ==UserScript==
// @name        Steam Review Percentage
// @namespace   caneva20.me
// @match       *://store.steampowered.com/app/*
// @grant       none
// @version     1.0.0
// @author      caneva20
// @description Add review percentage beside review summary on app pages
// ==/UserScript==

(function () {
    'use strict';

    var reviewRows = document.querySelectorAll('.user_reviews_summary_row');

    reviewRows.forEach(function (reviewRow) {
        var review = reviewRow.getAttribute("data-tooltip-html");
        var reviewPercent = review.match(/(\d+)%/)[1];

        var summary = reviewRow.querySelector(".summary > .game_review_summary");

        createStyledElement(summary, reviewPercent);
    });
})();

function createStyledElement(container, positivePercentage) {
    const positiveSpan = document.createElement('span');
    positiveSpan.textContent = `${positivePercentage}%`;
    positiveSpan.style.color = getColor(positivePercentage, true);
    positiveSpan.style.marginRight = '4px';

    container.prepend(positiveSpan);
}

function getColor(percent) {
    const red = Math.round(255 * (1 - percent / 100));
    const green = Math.round(255 * (percent / 100));
    return `rgb(${red}, ${green}, 0)`;
}