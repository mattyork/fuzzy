/*
 * FuzzySearch
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */(function(){var e=this,t={};typeof exports!="undefined"?module.exports=t:e.fuzzy=t,t.simpleFilter=function(e,n){return n.filter(function(n){return t.test(e,n)})},t.test=function(e,n){return t.match(e,n)!==null},t.match=function(e,t,n){var r=0,i=[],s=t.length,o=0,u=0,a=n&&n.pre||"",f=n&&n.post||"",l;e=e.toLowerCase();for(var c=0;c<s;c++)l=t[c],l.toLowerCase()===e.charAt(r)?(l=a+l+f,r+=1,u+=1+u):u=0,o+=u,i[i.length]=l;return r===e.length?{rendered:i.join(""),score:o}:null},t.filter=function(e,n,r){var i=r&&r.extract||function(e){return e};return n.reduce(function(n,s,o,u){var a=i(s),f=t.match(e,a,r);return f!=null&&(n[n.length]={string:f.rendered,score:f.score,index:o,original:s}),n},[]).sort(function(e,t){var n=t.score-e.score;return n?n:e.index-t.index})}})();