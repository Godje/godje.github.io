function Colors(){
  var Colors = {
    playdoh: {
      hex: "#1abc9c",
      rgb: "rgb(26, 188, 156)",
      rgba: "rgba(26, 188, 156, 1.0)",
    },
    red: {
      hex: "#e74c3c",
      rgb: "rgb(231, 76, 60)",
      rgba: "rgba(231, 76, 60,1.0)",
    }
  };
  return arguments.length==1?Colors[arguments[0]].hex:Colors[arguments[0]][arguments[1]];
}
