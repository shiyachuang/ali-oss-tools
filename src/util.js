function base64Buffer(img) {
    let pat = 'base64,';
    let pos = img.indexOf(pat);
    return new Buffer(img.slice(pos + pat.length), 'base64');
}
exports.base64Buffer = base64Buffer
function base64Ext(img) {
    let regex = /^data:.+\/(.+);base64,(.*)$/;
    let matches = img.slice(0, 30).match(regex);
    return matches[1];
}
exports.base64Ext = base64Ext