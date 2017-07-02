// abandon all hope ye who enter here 

(function() {
    var doc = document;

    // jsfiddle input, div, btn to target
    var jsfiddle = {
        input:      doc.getElementById("external_resource"),
        add_btn:    doc.querySelector(".bt-plus-circle"),
        target_div: doc.querySelectorAll(".ebCont")[1]
    }

    // extension url and div to create
    var ext = {
        cdn_url: "https://gist.githubusercontent.com/samayo/f57a51f319b793ac5bd19325affb3b3b/raw/5aeacf673b0f99c1c1b16d0f46fca126e765b68b/gistfile1.txt",
        wrapper_div: function(){
            return doc.querySelector(".jsfiddle_cdn_loader");
        },
        create_wrapper_div: function() {
            return doc.createElement("div");
        }
    }

    var xmlhttp =  new XMLHttpRequest(); 


    // on keyup send ajax request to get list of cdn
    jsfiddle.input.addEventListener('keyup', function(e) {

        // clear input field if text is deleted (ex: backspace)
        if (jsfiddle.input.value.length <= 1) {
            if (doc.body.contains(ext.wrapper_div())) {
                ext.wrapper_div().innerHTML = ''
                return ;
            }
        }


        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var el = ext.create_wrapper_div()
                el.className = "jsfiddle_cdn_loader"
                var json = JSON.parse(xmlhttp.responseText)
                var libraries = json.results.sort();
                var element_ul = doc.createElement("ul");

                for (i = 0; i < libraries.length; i++) {
                    if (libraries[i].name.startsWith(jsfiddle.input.value)) {
                        var element_li = doc.createElement('li'),
                            element_a = doc.createElement("a");
                        element_a.innerText = libraries[i].name;
                        element_a.setAttribute("href", "#");
                        element_a.dataset.cdn = libraries[i].latest;
                        element_li.appendChild(element_a);
                        element_ul.appendChild(element_li);
                    }

                    el.appendChild(element_ul);
                    jsfiddle.target_div.appendChild(el)
                }

                // if library is selected from list, clear the dropdown
                element_ul.addEventListener("click", function(e) {
                    jsfiddle.input.value = e.target.dataset.cdn;
                    el.innerHTML = ''

                })
            }
        }

        xmlhttp.open("GET", ext.cdn_url, true)
        xmlhttp.send(null)

    });
})();