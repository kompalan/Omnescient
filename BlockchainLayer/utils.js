function utf8ToHex(str) {
    return Array.from(str).map(c => 
      c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) : 
      encodeURIComponent(c).replace(/\%/g,'').toLowerCase()
    ).join('');
}

function hexToUtf8(s)
{
  return decodeURIComponent(
     s.replace(/\s+/g, '') // remove spaces
      .replace(/[0-9a-f]{2}/g, '%$&') // add '%' before each 2 characters
  );
}


module.exports.utf8ToHex = utf8ToHex;
module.exports.hexToUtf8 = hexToUtf8;