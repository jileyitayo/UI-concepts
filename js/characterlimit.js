/**
 * Plugin: Character Limit
 * Version: 1.1.0
 * Author: utsavk (utsavkumar.official@gmail.com)
 * Options: counter (string) : class name for dynamic character counter
 */

/*global jQuery */ // this is to avoid jslint warning - 'Undeclared jQuery'

/* check if jQuery is loaded */
var jquery = typeof jQuery;
if (jquery === 'undefined') {
    throw new Error('Character Limit plugin requires jQuery. Please include it at the top');
}

(function ($) {

    'use strict';

    /* character limit public class definition */
    var Characterlimit = function (elem, options) {
        this.elem = $(elem);
        this.options = $.extend({}, $.fn.characterlimit.DEFAULTS, options);
    };

    Characterlimit.VERSION = '1.1.0';

    Characterlimit.prototype = {

        /* validate options */
        validate: function () {
            var opts = this.options;
            if (opts && $.type(opts.counter) === 'string') {
                return true;
            }
        },

        /* @getter: will convert string value containing integers to number */
        getNumber: function (string) {
            return parseInt(string, 10);
        }

    };

    /* character limit plugin definition */
    function Plugin(options) {

        /* declaring variables */
        var instance = new Characterlimit(this, options),
            counters = $(document).find('.' + instance.options.counter),
            charLimit,
            jqElem;

        /* validating options */
        if (!instance.validate()) {
            throw new Error('counter should be a string value');
        }

        return this.each(function (index, element) {

            charLimit = instance.getNumber(element.dataset.maxchar);
            jqElem = $(element);

            /* setting maxlength attribute to form elements */
            jqElem.attr('maxlength', charLimit);

            /* storing initial maxchar value */
            $(counters[index]).text(charLimit);

            /* change character counter on keyup event */
            jqElem.on('keyup', function () {
                charLimit = instance.getNumber(element.dataset.maxchar);
                $(counters[index]).text(charLimit - element.value.length);
            });

        });
    }

    var old = $.fn.characterlimit;

    $.fn.characterlimit = Plugin;
    $.fn.characterlimit.DEFAULTS = {
        counter: 'character-counter'
    };
    $.fn.characterlimit.Constructor = Characterlimit;

    /* character limit no conflict */
    $.fn.characterlimit.noConflict = function () {
        $.fn.characterlimit = old;
        return this;
    };

}(jQuery));