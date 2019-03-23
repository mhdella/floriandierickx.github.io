/*!*
 * Javascript BibTex Parser v0.1
 * Copyright (c) 2008 Simon Fraser University
 * @author Steve Hannah <shannah at sfu dot ca>
 *
 *
 * License:
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Credits:
 *
 * This library is a port of the PEAR Structures_BibTex parser written
 * in PHP (http://pear.php.net/package/Structures_BibTex).
 *
 * In order to make porting the parser into javascript easier, I have made
 * use of many phpjs functions, which are distributed here under the MIT License:
 *
 *
 * More info at: http://kevin.vanzonneveld.net/techblog/category/php2js
 *
 * php.js is copyright 2008 Kevin van Zonneveld.
 *
 * Portions copyright Ates Goral (http://magnetiq.com), Legaev Andrey,
 * _argos, Jonas Raoni Soares Silva (http://www.jsfromhell.com),
 * Webtoolkit.info (http://www.webtoolkit.info/), Carlos R. L. Rodrigues, Ash
 * Searle (http://hexmen.com/blog/), Tyler Akins (http://rumkin.com), mdsjack
 * (http://www.mdsjack.bo.it), Alexander Ermolaev
 * (http://snippets.dzone.com/user/AlexanderErmolaev), Andrea Giammarchi
 * (http://webreflection.blogspot.com), Bayron Guevara, Cord, David, Karol
 * Kowalski, Leslie Hoare, Lincoln Ramsay, Mick@el, Nick Callen, Peter-Paul
 * Koch (http://www.quirksmode.org/js/beat.html), Philippe Baumann, Steve
 * Clay, booeyOH
 *
 * Licensed under the MIT (MIT-LICENSE.txt) license.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL KEVIN VAN ZONNEVELD BE LIABLE FOR ANY CLAIM, DAMAGES
 * OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Synopsis:
 * ----------
 *
 * This class provides the following functionality:
 *    1. Parse BibTex into a logical data javascript data structure.
 *    2. Output parsed BibTex entries as HTML, RTF, or BibTex.
 *
 *
 * The following usage instructions have been copyed and adapted from the PHP instructions located
 * at http://pear.php.net/manual/en/package.structures.structures-bibtex.intro.php
 * Introduction
 * --------------
 * Overview
 * ----------
 * This package provides methods to access information stored in a BibTex
 * file. During parsing it is possible to let the data be validated. In
 * addition. the creation of BibTex Strings as well as RTF Strings is also
 * supported. A few examples
 *
 * Example 1. Loading a BibTex File and printing the parsed array
 * <script src="BibTex.js"></script>
 * <script>
 * bibtex = new BibTex();
 * bibtex.content = content; // the bibtex content as a string
 *
 * bibtex->parse();
 * alert(print_r($bibtex->data,true));
 * </script>
 *
 *
 * Options
 * --------
 * Options can be set either in the constructor or with the method
 * setOption(). When setting in the constructor the options are given in an
 * associative array. The options are:
 *
 * 	-	stripDelimiter (default: true) Stripping the delimiter surrounding the entries.
 * 	-	validate (default: true) Validation while parsing.
 * 	-	unwrap (default: false) Unwrapping entries while parsing.
 * 	-	wordWrapWidth (default: false) If set to a number higher one
 * 	    that the entries are wrapped after that amount of characters.
 * 	-	wordWrapBreak (default: \n) String used to break the line (attached to the line).
 * 	-	wordWrapCut (default: 0) If set to zero the line will we
 * 	    wrapped at the next possible space, if set to one the line will be
 * 	    wrapped exactly after the given amount of characters.
 * 	-	removeCurlyBraces (default: false) If set to true Curly Braces will be removed.
 *
 * Example of setting options in the constructor:
 *
 * Example 2. Setting options in the constructor
 * bibtex = new BibTex({'validate':false, 'unwrap':true});
 *
 *
 * Example of setting options using the method setOption():
 *
 * Example 62-3. Setting options using setOption
 * bibtex = new BibTex();
 * bibtex.setOption('validate', false);
 * bibtex.setOption('unwrap', true);
 *
 * Stored Data
 * ------------
 * The data is stored in the class variable data. This is a a list where
 * each entry is a hash table representing one bibtex-entry. The keys of
 * the hash table correspond to the keys used in bibtex and the values are
 * the corresponding values. Some of these keys are:
 *
 * 	-	cite - The key used in a LaTeX source to do the citing.
 * 	-	entryType - The type of the entry, like techreport, book and so on.
 * 	-	author - One or more authors of the entry. This entry is also a
 * 	    list with hash tables representing the authors as entries. The
 * 	    author has table is explained later.
 * 	-	title - Title of the entry.
 *
 * Author
 * ------
 * As described before the authors are stored in a list. Every entry
 * representing one author as a has table. The hash table consits of four
 * keys: first, von, last and jr. The keys are explained in the following
 * list:
 *
 * 	-	first - The first name of the author.
 * 	-	von - Some names have a 'von' part in their name. This is usually a sign of nobleness.
 * 	-	last - The last name of the author.
 * 	-	jr - Sometimes a author is the son of his father and has the
 * 	    same name, then the value would be jr. The same is true for the
 * 	    value sen but vice versa.
 *
 * Adding an entry
 * ----------------
 * To add an entry simply create a hash table with the needed keys and
 * values and call the method addEntry().
 * Example 4. Adding an entry
 * bibtex                         = new BibTex();
 * var addarray                   = {};
 * addarray['entryType']          = 'Article';
 * addarray['cite']               = 'art2';
 * addarray['title']              = 'Titel of the Article';
 * addarray['author'] = [];
 * addarray['author'][0]['first'] = 'John';
 * addarray['author'][0]['last']  = 'Doe';
 * addarray['author'][1]['first'] = 'Jane';
 * addarray['author'][1]['last']  = 'Doe';
 * bibtex.addEntry(addarray);
 */
function array(){return Array.prototype.slice.call(arguments);}function array_key_exists(key,search){if(!search||(search.constructor!==Array&&search.constructor!==Object)){return false;}return key in search;}function array_keys(input,search_value,strict){var tmp_arr=new Array(),strict=!!strict,include=true,cnt=0;for(key in input){include=true;if(search_value!=undefined){if(strict&&input[key]!==search_value){include=false;}else{if(input[key]!=search_value){include=false;}}}if(include){tmp_arr[cnt]=key;cnt++;}}return tmp_arr;}function array_values(input){var tmp_arr=[],key="";if(input&&typeof input==="object"&&input.change_key_case){return input.values();}for(key in input){tmp_arr[tmp_arr.length]=input[key];}return tmp_arr;}function in_array(needle,haystack,strict){var found=false,key,strict=!!strict;for(key in haystack){if((strict&&haystack[key]===needle)||(!strict&&haystack[key]==needle)){found=true;break;}}return found;}function sizeof(mixed_var,mode){return count(mixed_var,mode);}function count(mixed_var,mode){var key,cnt=0;if(mode=="COUNT_RECURSIVE"){mode=1;}if(mode!=1){mode=0;}for(key in mixed_var){cnt++;if(mode==1&&mixed_var[key]&&(mixed_var[key].constructor===Array||mixed_var[key].constructor===Object)){cnt+=count(mixed_var[key],1);}}return cnt;}function explode(delimiter,string,limit){var emptyArray={0:""};if(arguments.length<2||typeof arguments[0]=="undefined"||typeof arguments[1]=="undefined"){return null;}if(delimiter===""||delimiter===false||delimiter===null){return false;}if(typeof delimiter=="function"||typeof delimiter=="object"||typeof string=="function"||typeof string=="object"){return emptyArray;}if(delimiter===true){delimiter="1";}if(!limit){return string.toString().split(delimiter.toString());}else{var splitted=string.toString().split(delimiter.toString());var partA=splitted.splice(0,limit-1);var partB=splitted.join(delimiter.toString());partA.push(partB);return partA;}}function implode(glue,pieces){return((pieces instanceof Array)?pieces.join(glue):pieces);}function join(glue,pieces){return implode(glue,pieces);}function split(delimiter,string){return explode(delimiter,string);}function str_replace(search,replace,subject){var f=search,r=replace,s=subject;var ra=is_array(r),sa=is_array(s),f=[].concat(f),r=[].concat(r),i=(s=[].concat(s)).length;while(j=0,i--){while(s[i]=s[i].split(f[j]).join(ra?r[j]||"":r[0]),++j in f){}}return sa?s:s[0];}function strlen(string){return(""+string).length;}function strpos(haystack,needle,offset){var i=haystack.indexOf(needle,offset);return i>=0?i:false;}function strrpos(haystack,needle,offset){var i=haystack.lastIndexOf(needle,offset);return i>=0?i:false;}function strtolower(str){return str.toLowerCase();}function strtoupper(str){return str.toUpperCase();}function substr(f_string,f_start,f_length){if(f_start<0){f_start+=f_string.length;}if(f_length==undefined){f_length=f_string.length;}else{if(f_length<0){f_length+=f_string.length;}else{f_length+=f_start;}}if(f_length<f_start){f_length=f_start;}return f_string.substring(f_start,f_length);}function trim(str,charlist){if(!str){return"";}var whitespace;if(!charlist){whitespace=" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";}else{whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,"$1");}for(var i=0;i<str.length;i++){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(i);break;}}for(i=str.length-1;i>=0;i--){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(0,i+1);break;}}return whitespace.indexOf(str.charAt(0))===-1?str:"";}function wordwrap(str,int_width,str_break,cut){var m=int_width,b=str_break,c=cut;var i,j,l,s,r;if(m<1){return str;}for(i=-1,l=(r=str.split("\n")).length;++i<l;r[i]+=s){for(s=r[i],r[i]="";s.length>m;r[i]+=s.slice(0,j)+((s=s.slice(j)).length?b:"")){j=c==2||(j=s.slice(0,m+1).match(/\S*(\s)?$/))[1]?m:j.input.length-j[0].length||c==1&&m||j.input.length+(j=s.slice(m).match(/^\S*/)).input.length;}}return r.join("\n");}function is_string(mixed_var){return(typeof(mixed_var)=="string");}function ord(string){return string.charCodeAt(0);}function array_unique(array){var p,i,j,tmp_arr=array;for(i=tmp_arr.length;i;){for(p=--i;p>0;){if(tmp_arr[i]===tmp_arr[--p]){for(j=p;--p&&tmp_arr[i]===tmp_arr[p];){}i-=tmp_arr.splice(p+1,j-p).length;}}}return tmp_arr;}function print_r(array,return_val){var output="",pad_char=" ",pad_val=4;var formatArray=function(obj,cur_depth,pad_val,pad_char){if(cur_depth>0){cur_depth++;}var base_pad=repeat_char(pad_val*cur_depth,pad_char);var thick_pad=repeat_char(pad_val*(cur_depth+1),pad_char);var str="";if(obj instanceof Array||obj instanceof Object){str+="Array\n"+base_pad+"(\n";for(var key in obj){if(obj[key] instanceof Array||obj[key] instanceof Object){str+=thick_pad+"["+key+"] => "+formatArray(obj[key],cur_depth+1,pad_val,pad_char);}else{str+=thick_pad+"["+key+"] => "+obj[key]+"\n";}}str+=base_pad+")\n";}else{str=obj.toString();}return str;};var repeat_char=function(len,pad_char){var str="";for(var i=0;i<len;i++){str+=pad_char;}return str;};output=formatArray(array,0,pad_val,pad_char);if(return_val!==true){document.write("<pre>"+output+"</pre>");return true;}else{return output;}}function is_array(mixed_var){return(mixed_var instanceof Array);}function BibTex(options){if(typeof options=="undefined"){options={};}this.data;this.content;this._delimiters;this.warnings;this._options;this.rtfstring;this.htmlstring;this.allowedEntryTypes;this.authorstring;this._delimiters={'"':'"',"{":"}"};this.data=[];this.content="";this.warnings=[];this._options={stripDelimiter:true,validate:true,unwrap:false,wordWrapWidth:false,wordWrapBreak:"\n",wordWrapCut:0,removeCurlyBraces:false,extractAuthors:true};for(option in options){test=this.setOption(option,options[option]);if(this.isError(test)){}}this.rtfstring='AUTHORS, "{\b TITLE}", {i JOURNAL}, YEAR';this.htmlstring='AUTHORS, "<strong>TITLE</strong>", <em>JOURNAL</em>, YEAR<br />';this.allowedEntryTypes=array("article","book","booklet","confernce","inbook","incollection","inproceedings","manual","masterthesis","misc","phdthesis","proceedings","techreport","unpublished");this.authorstring="VON LAST, JR, FIRST";}BibTex.prototype={setOption:function(option,value){ret=true;if(array_key_exists(option,this._options)){this._options[option]=value;}else{ret=this.raiseError("Unknown option "+option);}return ret;},parse:function(){this.warnings=[];this.data=[];var valid=true;var open=0;var entry=false;var charv="";var lastchar="";var buffer="";for(var i=0;i<strlen(this.content);i++){charv=substr(this.content,i,1);if((0!=open)&&("@"==charv)){if(!this._checkAt(buffer)){this._generateWarning("WARNING_MISSING_END_BRACE","",buffer);charv="}";i--;}}if((0==open)&&("@"==charv)){entry=true;}else{if(entry&&("{"==charv)&&("\\"!=lastchar)){open++;}else{if(entry&&("}"==charv)&&("\\"!=lastchar)){open--;if(open<0){valid=false;}if(0==open){entry=false;var entrydata=this._parseEntry(buffer);if(!entrydata){}else{this.data[this.data.length]=entrydata;}buffer="";}}}}if(entry){buffer+=charv;}lastchar=charv;}if(1==open){entrydata=this._parseEntry(buffer);if(!entrydata){valid=false;}else{this.data[this.data.length]=entrydata;buffer="";open=0;}}if(0!=open){valid=false;}if(this._options.validate){cites=[];for(var i=0;i<this.data.length;i++){cites[cites.length]=this.data[i]["cite"];}unique=array_unique(cites);if(cites.length!=sizeof(unique)){notuniques=[];for(var i=0;i<cites.length;i++){if(""==unique[i]){notuniques[notuniques.length]=cites[i];}}this._generateWarning("WARNING_MULTIPLE_ENTRIES",implode(",",notuniques));}}if(valid){this.content="";return true;}else{return this.raiseError("Unbalanced parenthesis");}},_parseEntry:function(entry){var entrycopy="";if(this._options.validate){entrycopy=entry;}var ret={};if("@string"==strtolower(substr(entry,0,7))){if(this._options.validate){this._generateWarning("STRING_ENTRY_NOT_YET_SUPPORTED","",entry+"}");}}else{if("@preamble"==strtolower(substr(entry,0,9))){if(this._options.validate){this._generateWarning("PREAMBLE_ENTRY_NOT_YET_SUPPORTED","",entry+"}");}}else{while(strrpos(entry,"=")!==false){position=strrpos(entry,"=");proceed=true;if(substr(entry,position-1,1)=="\\"){proceed=false;}if(proceed){proceed=this._checkEqualSign(entry,position);}while(!proceed){substring=substr(entry,0,position);position=strrpos(substring,"=");proceed=true;if(substr(entry,position-1,1)=="\\"){proceed=false;}if(proceed){proceed=this._checkEqualSign(entry,position);}}value=trim(substr(entry,position+1));entry=substr(entry,0,position);if(","==substr(value,strlen(value)-1,1)){value=substr(value,0,-1);}if(this._options.validate){this._validateValue(value,entrycopy);}if(this._options.stripDelimiter){value=this._stripDelimiter(value);}if(this._options.unwrap){value=this._unwrap(value);}if(this._options.removeCurlyBraces){value=this._removeCurlyBraces(value);}position=strrpos(entry,",");field=strtolower(trim(substr(entry,position+1)));ret[field]=value;entry=substr(entry,0,position);}var arr=entry.split("{");ret.cite=trim(arr[1]);ret.entryType=strtolower(trim(arr[0]));if("@"==ret.entryType.substring(0,1)){ret.entryType=substr(ret.entryType,1);}if(this._options.validate){if(!this._checkAllowedEntryType(ret.entryType)){this._generateWarning("WARNING_NOT_ALLOWED_ENTRY_TYPE",ret.entryType,entry+"}");}}if(in_array("author",array_keys(ret))&&this._options.extractAuthors){ret.author=this._extractAuthors(ret.author);}if(in_array("editor",array_keys(ret))&&this._options.extractAuthors){ret.editor=this._extractAuthors(ret.editor);}}}return ret;},_checkEqualSign:function(entry,position){var ret=true;var length=strlen(entry);var open=0;for(var i=length-1;i>=position;i--){precedingchar=substr(entry,i-1,1);charv=substr(entry,i,1);if(("{"==charv)&&("\\"!=precedingchar)){open++;}if(("}"==charv)&&("\\"!=precedingchar)){open--;}}if(0!=open){ret=false;}if(ret){entrycopy=trim(entry);lastchar=substr(entrycopy,strlen(entrycopy)-1,1);if(","==lastchar){lastchar=substr(entrycopy,strlen(entrycopy)-2,1);}if('"'==lastchar){ret=false;found=0;for(var i=length;i>=position;i--){precedingchar=substr(entry,i-1,1);charv=substr(entry,i,1);if(('"'==charv)&&("\\"!=precedingchar)){found++;}if(2==found){ret=true;break;}}}}return ret;},_checkAllowedEntryType:function(entry){return in_array(entry,this.allowedEntryTypes);},_checkAt:function(entry){var ret=false;var opening=array_keys(this._delimiters);var closing=array_values(this._delimiters);if(strrpos(entry,"=")!==false){position=strrpos(entry,"=");proceed=true;if(substr(entry,position-1,1)=="\\"){proceed=false;}while(!proceed){substring=substr(entry,0,position);position=strrpos(substring,"=");proceed=true;if(substr(entry,position-1,1)=="\\"){proceed=false;}}value=trim(substr(entry,position+1));open=0;charv="";lastchar="";for(var i=0;i<strlen(value);i++){charv=substr(this.content,i,1);if(in_array(charv,opening)&&("\\"!=lastchar)){open++;}else{if(in_array(charv,closing)&&("\\"!=lastchar)){open--;}}lastchar=charv;}if(open>0){ret=true;}}return ret;},_stripDelimiter:function(entry){var beginningdels=array_keys(this._delimiters);var ength=strlen(entry);var firstchar=substr(entry,0,1);var lastchar=substr(entry,-1,1);while(in_array(firstchar,beginningdels)){if(lastchar==this._delimiters[firstchar]){entry=substr(entry,1,-1);}else{break;}firstchar=substr(entry,0,1);lastchar=substr(entry,-1,1);}return entry;},_unwrap:function(entry){entry=entry.replace(/\s+/," ");return trim(entry);},_wordwrap:function(entry){if((""!=entry)&&(is_string(entry))){entry=wordwrap(entry,this._options.wordWrapWidth,this._options.wordWrapBreak,this._options.wordWrapCut);}return entry;},_extractAuthors:function(entry){entry=this._unwrap(entry);var authorarray=entry.split(" and ");for(var i=0;i<authorarray.length;i++){var author=trim(authorarray[i]);var first="";var von="";var last="";var jr="";if(strpos(author,",")===false){var tmparray=author.split(" |~");var size=tmparray.length;if(1==size){last=tmparray[0];}else{if(2==size){first=tmparray[0];last=tmparray[1];}else{var invon=false;var inlast=false;for(var j=0;j<(size-1);j++){if(inlast){last+=" "+tmparray[j];}else{if(invon){casev=this._determineCase(tmparray[j]);if(this.isError(casev)){}else{if((0==casev)||(-1==casev)){islast=true;for(var k=(j+1);k<(size-1);k++){futurecase=this._determineCase(tmparray[k]);if(this.isError(casev)){}else{if(0==futurecase){islast=false;}}}if(islast){inlast=true;if(-1==casev){last+=" "+tmparray[j];}else{von+=" "+tmparray[j];}}else{von+=" "+tmparray[j];}}else{von+=" "+tmparray[j];}}}else{var casev=this._determineCase(tmparray[j]);if(this.isError(casev)){}else{if(0==casev){invon=true;von+=" "+tmparray[j];}else{first+=" "+tmparray[j];}}}}}last+=" "+tmparray[size-1];}}}else{var tmparray=[];tmparray=explode(",",author);vonlastarray=[];vonlastarray=explode(" ",tmparray[0]);size=sizeof(vonlastarray);if(1==size){last=vonlastarray[0];}else{inlast=false;for(var j=0;j<(size-1);j++){if(inlast){last+=" "+vonlastarray[j];}else{if(0!=(this._determineCase(vonlastarray[j]))){islast=true;for(var k=(j+1);k<(size-1);k++){this._determineCase(vonlastarray[k]);casev=this._determineCase(vonlastarray[k]);if(this.isError(casev)){}else{if(0==casev){islast=false;}}}if(islast){inlast=true;last+=" "+vonlastarray[j];}else{von+=" "+vonlastarray[j];}}else{von+=" "+vonlastarray[j];}}}last+=" "+vonlastarray[size-1];}if(3==tmparray.length){jr=tmparray[1];}first=tmparray[tmparray.length-1];}authorarray[i]={first:trim(first),von:trim(von),last:trim(last),jr:trim(jr)};}return authorarray;},_determineCase:function(word){var ret=-1;var trimmedword=trim(word);if(is_string(word)&&(strlen(trimmedword)>0)){var i=0;var found=false;var openbrace=0;while(!found&&(i<=strlen(word))){var letter=substr(trimmedword,i,1);var ordv=ord(letter);if(ordv==123){openbrace++;}if(ordv==125){openbrace--;}if((ordv>=65)&&(ordv<=90)&&(0==openbrace)){ret=1;found=true;}else{if((ordv>=97)&&(ordv<=122)&&(0==openbrace)){ret=0;found=true;}else{i++;}}}}else{ret=this.raiseError("Could not determine case on word: "+word);}return ret;},isError:function(obj){return(typeof(obj)=="Object"&&obj.isError==1);},_validateValue:function(entry,wholeentry){if(entry.match(/^{.*@.*}/)){this._generateWarning("WARNING_AT_IN_BRACES",entry,wholeentry);}if(entry.match(/^\".*\\".*\"/)){this._generateWarning("WARNING_ESCAPED_DOUBLE_QUOTE_INSIDE_DOUBLE_QUOTES",entry,wholeentry);}var open=0;var lastchar="";var charv="";for(var i=0;i<strlen(entry);i++){charv=substr(entry,i,1);if(("{"==charv)&&("\\"!=lastchar)){open++;}if(("}"==charv)&&("\\"!=lastchar)){open--;}lastchar=charv;}if(0!=open){this._generateWarning("WARNING_UNBALANCED_AMOUNT_OF_BRACES",entry,wholeentry);}},_removeCurlyBraces:function(value){var beginningdels=array_keys(this._delimiters);var firstchar=substr(value,0,1);var lastchar=substr(value,-1,1);var begin="";var end="";while(in_array(firstchar,beginningdels)){if(lastchar==this._delimiters[firstchar]){begin+=firstchar;end+=lastchar;value=substr(value,1,-1);}else{break;}firstchar=substr(value,0,1);lastchar=substr(value,-1,1);}var pattern="/([^\\\\]){(+*?[^\\\\])}/";var replacement="12";value=value.replace(/([^\\\\])\{(.*?[^\\\\])\}/,replacement);value=begin+value+end;return value;},_generateWarning:function(type,entry,wholeentry){if(typeof wholeentry=="undefined"){wholeentry="";}var warning={};warning.warning=type;warning.entry=entry;warning.wholeentry=wholeentry;this.warnings[this.warnings.length]=warning;},clearWarnings:function(){this.warnings=array();},hasWarning:function(){if(sizeof(this.warnings)>0){return true;}else{return false;}},amount:function(){return sizeof(this.data);},_formatAuthor:function(array){if(!array_key_exists("von",array)){array.von="";}else{array.von=trim(array.von);}if(!array_key_exists("last",array)){array.last="";}else{array.last=trim(array.last);}if(!array_key_exists("jr",array)){array.jr="";}else{array.jr=trim(array.jr);}if(!array_key_exists("first",array)){array.first="";}else{array.first=trim(array.first);}ret=this.authorstring;ret=str_replace("VON",array.von,ret);ret=str_replace("LAST",array.last,ret);ret=str_replace("JR",array.jr,ret);ret=str_replace("FIRST",array.first,ret);return trim(ret);},bibTex:function(){var bibtex="";for(var i=0;i<this.data.length;i++){var entry=this.data[i];bibtex+="@"+strtolower(entry.entryType)+" { "+entry.cite+",\n";for(key in entry){var val=entry[key];if(this._options.wordWrapWidth>0){val=this._wordWrap(val);}if(!in_array(key,array("cite","entryType","author"))){bibtex+="\t"+key+" = {"+val+"},\n";}}if(array_key_exists("author",entry)){if(this._options.extractAuthors){tmparray=[];for(j in entry.author){var authorentry=entry.author[j];tmparray[tmparray.length]=this._formatAuthor(authorentry);}author=join(" and ",tmparray);}else{author=entry.author;}}else{author="";}bibtex+="\tauthor = {"+author+"}\n";bibtex+="}\n\n";}return bibtex;},addEntry:function(newentry){this.data[this.data.length]=newentry;},getStatistic:function(){var ret=array();for(var i=0;i<this.data.length;i++){var entry=this.data[i];if(array_key_exists(entry.entryType,ret)){ret[entry.entryType]++;}else{ret[entry.entryType]=1;}}return ret;},rtf:function(){var ret="{\\rtf\n";for(var i=0;i<this.data.length;i++){var entry=this.data[i];line=this.rtfstring;title="";journal="";year="";authors="";if(array_key_exists("title",entry)){title=this._unwrap(entry.title);}if(array_key_exists("journal",entry)){journal=this._unwrap(entry.journal);}if(array_key_exists("year",entry)){year=this._unwrap(entry.year);}if(array_key_exists("author",entry)){if(this._options.extractAuthors){tmparray=[];for(var j in entry.author){var authorentry=entry.author[j];tmparray[tmparray.length]=this._formatAuthor(authorentry);}authors=join(", ",tmparray);}else{authors=entry.author;}}if((""!=title)||(""!=journal)||(""!=year)||(""!=authors)){line=str_replace("TITLE",title,line);line=str_replace("JOURNAL",journal,line);line=str_replace("YEAR",year,line);line=str_replace("AUTHORS",authors,line);line+="\n\\par\n";ret+=line;}else{this._generateWarning("WARNING_LINE_WAS_NOT_CONVERTED","",print_r(entry,1));}}ret+="}";return ret;},html:function(min,max){if(typeof min=="undefined"){min=0;}if(typeof max=="undefined"){max=this.data.length;}var ret="<p>\n";for(var i=min;i<max;i++){var entry=this.data[i];var line=this.htmlstring;var title="";var journal="";var year="";var authors="";if(array_key_exists("title",entry)){title=this._unwrap(entry.title);}if(array_key_exists("journal",entry)){journal=this._unwrap(entry.journal);}if(array_key_exists("year",entry)){year=this._unwrap(entry.year);}if(array_key_exists("author",entry)){if(this._options.extractAuthors){tmparray=[];for(j in entry.author){var authorentry=entry.author[j];tmparray[tmparray.length]=this._formatAuthor(authorentry);}authors=join(", ",tmparray);}else{authors=entry.author;}}if((""!=title)||(""!=journal)||(""!=year)||(""!=authors)){line=str_replace("TITLE",title,line);line=str_replace("JOURNAL",journal,line);line=str_replace("YEAR",year,line);line=str_replace("AUTHORS",authors,line);line+="\n";ret+=line;}else{this._generateWarning("WARNING_LINE_WAS_NOT_CONVERTED","",print_r(entry,1));}}ret+="</p>\n";return ret;}};
/*!
 * File:        jquery.dataTables.min.js
 * Version:     1.6.2
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 *
 * Copyright 2008-2010 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, as supplied with this software.
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */