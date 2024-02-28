const preprocessText = (text) =>{
    // Remove whitespace characters and empty lines
    return text.replace(/\s/g, '').replace(/^\s*[\r\n]/gm, '');
  }

  module.exports = {
    preprocessText,
  };