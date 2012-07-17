/*
 * FuzzySearch
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */(function(){var e=this,t={};typeof exports!="undefined"?module.exports=t:e.fuzzy=t;var n={fuzzyRegex:function(e){return new RegExp(".*"+e.split("").join(".*")+".*")}};t.simpleFilter=function(e,t,r){var i=n.fuzzyRegex(e);return r=r||function(e){return e},t.filter(function(e){return i.test(r(e))})},t.test=function(e,t){var r=n.fuzzyRegex(e);return(new RegExp(r)).test(t)},t.match=function(e,t,n){var r=0,i=[],s=t.length,o=0,u=0,a=n&&n.pre||"",f=n&&n.post||"";return e=e.toLowerCase(),t.split("").forEach(function(t){t.toLowerCase()===e.charAt(r)?(t=a+t+f,r+=1,u+=1+u):u=0,o+=u,i[i.length]=t}),r===e.length?{rendered:i.join(""),score:o}:null},t.filter=function(e,n,r){var i=r&&r.extract||function(e){return e};return n.reduce(function(n,s,o,u){var a=i(s),f=t.match(e,a,r);return f!=null&&(n[n.length]={string:f.rendered,score:f.score,index:o,original:s}),n},[]).sort(function(e,t){var n=t.score-e.score;return n?n:e.index-t.index})}})();