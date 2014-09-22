/* ========================================================================
 * Bootstrap-ImgSwitch: imgswitch.js v1.0.0
 * 
 * ========================================================================
 * Copyright 2014 Adrian Cieślak <rettush@gmail.com>  
 * Licensed under MIT
 * ======================================================================== */

+function($) {
    "use strict";

    // ImgSwitch PUBLIC CLASS DEFINITION
    // ==============================

    var ImgSwitch = function(element, options) {
        this.$element         = $(element)
        this.options          = options
        this.$items           = 
        this.currentWidth     = 
        this.currentWidthName =
        this.src              = null
    }

    // defaults
    ImgSwitch.DEFAULTS = {
        prop: 'value',
        widths: {
            sizeXs: 768,
            sizeSm: 992,
            sizeMd: 1200,
            sizeLg: 1367,
            sizeLs: 1921
        }
    }

    ImgSwitch.prototype.method = function(param) {
        // method do
    }

    ImgSwitch.prototype.otherMethod = function() {
        // method do other thing 
    }
    
    ImgSwitch.prototype.start = function(){
        this.getCurrentRes()
        this.getItems()
        this.getLastItem(this.items)
        this.getCurrentWidth()
        return this
    }
    
    ImgSwitch.prototype.resize = function() {
        this.changeImg()
    }
    
    ImgSwitch.prototype.changeImg = function() {
        this.getItems()
        this.getCurrentRes()
        this.getCurrentWidth()
        
        if(this.currentRes > this.currentWidth) {
            this.getCurrentWidth()
        }
        this.setSrc(this.currentWidthName)
    }
    
    // getters and setters
    ImgSwitch.prototype.setSrc = function($src) {
        this.$element.attr('src', this.$element.data($src))
        return this
    }
    
    ImgSwitch.prototype.getSrc = function($param) {
        this.src = typeof $param === 'undefined' ? this.$element.attr('src') : this.$element.data($param)
        return this.src
    }
    
    ImgSwitch.prototype.getItems = function() {
        var that = this
        this.items = new Array()
        $.each(this.$element.data(), function(index, value){
            $.each(that.options.widths, function(idx, val){
                if(index === idx) {
                    that.items.push([idx, val])
                }
            })
        })
    }
    
    ImgSwitch.prototype.getLastItem = function(items){
        items && this.items
        this.lastItem = items[items.length-1]
        return this.lastItem
    }
    
    ImgSwitch.prototype.getFirstItem = function(items){
        items && this.items
        this.firstItem = items[0]
        return this.firstItem
    }
    
    ImgSwitch.prototype.getCurrentRes = function(){
        this.currentRes = window.innerWidth
        return this.currentRes
    }
    
    
    // return the current widths/name
    ImgSwitch.prototype.getCurrentWidth = function(){
        var that = this
        $.each(this.items.reverse(), function(index, value){
            if(that.currentRes > value[1]) {
                that.currentWidth = value[1]
                that.currentWidthName = value[0]
            }
            if(that.currentRes < value[1]) {
                that.currentWidth = value[1]
                that.currentWidthName = value[0]
            } 
        })
        return this.currentWidth
    }
    
    // PLUGIN DEFINITION
    // ========================

    var old = $.fn.imgswitch

    $.fn.imgswitch = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.imgswitch')
            var options = $.extend({}, ImgSwitch.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action  = typeof option == 'string' ? option : 'start'
            
            if (!data)
                $this.data('bs.imgswitch', (data = new ImgSwitch(this, options)))
            if (action) data[action]()
            
        })
    }

    $.fn.imgswitch.Constructor = ImgSwitch


    // PLUGIN NO CONFLICT
    // ==================

    $.fn.imgswitch.noConflict = function() {
        $.fn.imgswitch = old
        return this
    }


    // PLUGIN DATA-API
    // ===============

    $(window).on('load', function() {
        $('[data-ride="imgswitch"]').each(function() {
            var $imgswitch = $(this)
            $imgswitch.imgswitch($imgswitch.data())
        })
    })

    
    $(window).smartresize(function(){
        $('[data-ride="imgswitch"]').each(function() {
            var $imgswitch = $(this)
            $imgswitch.imgswitch('resize')
        })
    });

}(window.jQuery);