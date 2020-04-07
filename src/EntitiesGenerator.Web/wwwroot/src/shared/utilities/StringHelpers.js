const _unicode = "áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴđĐ",
    _ascii = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYdD";

export default class StringHelpers {
    /**
     * Convert string to ASCII
     * @param {String} source String to convert
     * @returns {String} ASCII string
     */
    static toAscii(source) {
        for (var i = 0; i < _unicode.length; i++) {
            var regexp = new RegExp(_unicode.substr(i, 1), "g");
            source = source.replace(regexp, _ascii.substr(i, 1));
        }
        return source;
    }

    /**
     * Convert string to URL friendly
     * @param {String} source String to convert
     * @returns {String} URL friendly string
     */
    static toUrlFriendly(source) {
        source = StringHelpers.toAscii(source).trim().toLowerCase();
        source = source.replace(/ /g, "-");
        source = source.replace(/&nbsp;/g, "-");
        source = source.replace(/[^0-9a-z-]/g, "");
        while (source.indexOf("--") > -1) {
            source = source.replace(/--/g, "-");
        }
        return source;
    }
}
