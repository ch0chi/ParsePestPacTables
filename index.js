(function ($){


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

})(jQuery);