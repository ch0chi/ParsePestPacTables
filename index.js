(function ($){


    function Parse(){}

    Parse.prototype.handleLogic = function(){
        let csvString = $("#csv-string");
        let config = {
            delimiter: "",	// auto-detect
            newline: "",	// auto-detect
            quoteChar: '"',
            escapeChar: '"',
            header: false,
            trimHeaders: false,
            dynamicTyping: false,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: undefined,
            error: undefined,
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined,
            transform: undefined
        };

        $("#submit-csv").click(function(){

            let parsedArr = [];
            let data = Papa.parse(csvString.val(), config);
            let row = data.data;

            for(let i =0;i<row.length;i++){

                let formattedRow = row[i].slice(0,2);
                let strRow = formattedRow.toString();

                parsedArr.push(strRow.replace(",",":"));
            }

            $("#parse-results").text(parsedArr.toString().split(',').join("\n"));

        });
    };


   Parse.prototype.copyResult = function(element){
       $(".copy-text").click(function(){
           let $temp = $("<textarea>");
           let brRegex = /<br\s*[\/]?>/gi;
           $("body").append($temp);
           $temp.val($(element).html().replace(brRegex, "\r\n")).select();
           document.execCommand("copy");
           $temp.remove();
           $(element).addClass("hightlight");
           $(element).select();

           $(".copied").addClass("active");
           setTimeout(function(){
               $(".copied").removeClass('active');
           },2500);
       });

    };

   Parse.prototype.handleFocusOut = function(element){
       $(element).focusout(function(){
          $(element).removeClass("hightlight");
       });
   };

   Parse.prototype.displayNotification =function(element,cssClass){
       $(element).fadeIn("slow",function(){
          $(this).addClass("active");
       });
   };

    let parse = new Parse();
    let  copyText = $("#parse-results");
   parse.handleLogic();
   parse.copyResult(copyText);
   parse.handleFocusOut(copyText);

})(jQuery);