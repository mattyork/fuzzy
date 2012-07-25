/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */(function(){var e=this,t={};typeof exports!="undefined"?module.exports=t:e.fuzzy=t,t.simpleFilter=function(e,n){return n.filter(function(n){return t.test(e,n)})},t.test=function(e,n){return t.match(e,n)!==null},t.match=function(e,t,n){n=n||{};var r=0,i=[],s=t.length,o=0,u=0,a=n.pre||"",f=n.post||"",l=n.caseSensitive&&t||t.toLowerCase(),c,h;e=n.caseSensitive&&e||e.toLowerCase();for(var p=0;p<s;p++)c=t[p],l[p]===e[r]?(c=a+c+f,r+=1,u+=1+u):u=0,o+=u,i[i.length]=c;return r===e.length?{rendered:i.join(""),score:o}:null},t.filter=function(e,n,r){return r=r||{},n.reduce(function(n,i,s,o){var u=i;r.extract&&(u=r.extract(i));var a=t.match(e,u,r);return a!=null&&(n[n.length]={string:a.rendered,score:a.score,index:s,original:i}),n},[]).sort(function(e,t){var n=t.score-e.score;return n?n:e.index-t.index})}})();