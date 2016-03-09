/*
 * Henry JavaScript Library v 1.0.0
 * http://xuyanquan.vicp.cc/index.html
 *
 * Includes JQuery.js
 * http://jquery.org/
 *
 * Copyright 2013 Henry Foundation and other contributors
 *
 * Date: 2013/2/16 12:02
 */

var FireBug = {
		_on : false,
		_CONSOLE_STYLE : {
			"font-size" : "16px",
			"font-weight" : "900",
			"color" : "lightgreen",
			"background" : "black",
			"font-family" : "'microsoft yahei', arial"
		},
		_BODY_STYLE : {},
		_stream : null,
		_wrapper : $(document.createElement("div")).addClass("firebug").css("line-height","120%"),
		_open : function(){
			for(var css in this._CONSOLE_STYLE)
				this._BODY_STYLE[css] = $("body").css(css);
			this._stream = $("body").css(this._CONSOLE_STYLE);
			this._on = true;
		},
		close : function(){
			$("body").css(this._BODY_STYLE).children(".firebug").remove();
			this._on = false;			
		},
		print : function(param){
			"object" === typeof param ? this.showObj(param) : this.log(param);
		},
		showObj : function(obj){
			for(var p in obj)
				this.log(p + " : " + obj[p]);
		},
		log : function(msg){
			this._stream.append(this._wrapper.clone().html(msg||""));
		},
		warn : function(msg){
			this._stream.append(this._wrapper.clone().css("color","red").html(msg||""));
		},
		type : function(param){
			this.log(typeof param);
		}
}

function aop(obj,before,after,filter){
	for (var fun in obj)		
		(function(){
			if (filter(fun))return;
			var _fun = obj[fun];
			obj[fun] = function(){
				before.apply(obj);
				_fun.apply(obj,arguments);
				after.apply(obj);
				return obj;
			}
		})();
}

aop(FireBug, 
	function(){
		if (!this._on)
			this._open();
	},
	function(){
	}, 
	function(fun_name){
		return /^_/.test(fun_name);
	}
);

window.F = FireBug;

function log(msg){return F.log(msg);}
function print(msg){return F.print(msg);}
function warn(msg){return F.warn(msg);}
function type(param){return F.type(param);}



var record = {};

var result = [];

var filter = [ 'g-mod', 'home-wrap', 'g-clearfix' ];

function generateCss() {
	var $body = $( 'body' );
	$body.children().each( function () {
		var _this = this;
		var arr = $( this ).attr( 'class' ).split( ' ' );
		if ( arr.length == 1 ) {
			recordClass( '.' + arr[0] );
			findChild( '.' + arr[0], $( this ).children() );
		} else {
			arr.forEach( function ( cn ) {
				recordClass( '.' + cn );
				findChild( '.' + cn, $( _this ).children() );
			} );
		}
	} );
}

function findChild( classname, $dom ) {
	if ( $dom.size() == 1 ) {		
		var isNoClass = false, arr;
		if ( $dom.attr( 'class' ) ) {			
			arr = $dom.attr( 'class' ).split( ' ' );
		} else {
			arr = [ $dom.get(0).tagName.toLowerCase() ];
			isNoClass = true;
		}
		arr.forEach( function ( cn ) {
			if ( cn == '' ) return true;
			var rec;
			if ( isNoClass ) {
				rec = recordClass( classname + ' ' + cn );
			} else {
				rec = recordClass( classname + ' .' + cn );				
			}
			if ( $dom.children().size() != 0 ) {
				if ( rec ) {
					findChild( rec, $dom.children() );	
				} else {
					findChild( classname, $dom.children() );
				}
			} 
		} );
	} else {		
		$dom.each( function () {			
			findChild( classname, $(this) );
		} );
	}
}

function recordClass( cn ) {	

	var flag = false;
	filter.forEach( function ( reg ) {
		flag = flag || ( cn.indexOf( reg ) > -1 );
	} );

	if ( flag ) return false;

	var a = cn.split( ' ' );
	if ( a.length == 1 && !record[ cn ] ) {
		record[ cn ] = cn;
		result.push( cn );
		return;
	}
	var br = [];
	var b = a.shift();
	var c = a.pop();
	br.push( b + ' ' + c );

	while ( a.length > 0 ) {
		b = b + ' ' + a.shift();
		br.push( b + ' ' + c );
	}

	while( br.length > 0 ) {		
		if ( record[ br[0] ] ) {
			br.shift();
		} else {
			record[ br[0] ] = br[0];
			result.push( br[0] );
			return br[0];
		}
	}

}

$( function () {
	generateCss();
	$( document.body ).html('');
	result.sort().forEach( function ( sty ) {
		log( sty + '{  }' );
	} );
} );

