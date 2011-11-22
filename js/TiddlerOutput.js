/*
Functions concerned with parsing representations of tiddlers
*/

var argParser = require("./ArgParser.js"),
	utils = require("./Utils.js");

var tiddlerOutput = exports;

/*
Output a tiddler as an HTML <DIV>
out - array to push the output strings
tid - the tiddler to be output
options - options:
		omitPrecedingLineFeed - determines if a linefeed is inserted between the <PRE> tag and the text
*/
tiddlerOutput.outputTiddlerDiv = function(out,tid,options) {
	var result = [];
	var outputAttribute = function(name,value) {
		result.push(" " + name + "=\"" + value + "\"");
	};
	result.push("<div");
	for(var t in tid.fields) {
		switch(t) {
			case "text":
				// Ignore the text field
				break;
			case "tags":
				// Output tags as a list
				outputAttribute(t,tiddlerOutput.stringifyTags(tid.fields.tags));
				break;
			case "modified":
			case "created":
				// Output dates in YYYYMMDDHHMMSS
				outputAttribute(t,utils.convertToYYYYMMDDHHMM(tid.fields[t]));
				break;
			default:
				// Output other attributes raw
				outputAttribute(t,tid.fields[t]);
				break;
		}
	}
	result.push(">\n<pre>");
	if(!(options && options.omitPrecedingLineFeed))
		result.push("\n");
	result.push(utils.htmlEncode(tid.fields.text));
	result.push("</pre>\n</div>");
	out.push(result.join(""));
}

tiddlerOutput.stringifyTags = function(tags) {
	var results = [];
	for(var t=0; t<tags.length; t++) {
		if(tags[t].indexOf(" ") !== -1) {
			results.push("[[" + tags[t] + "]]");
		} else {
			results.push(tags[t]);
		}
	}
	return results.join(" ");
}


