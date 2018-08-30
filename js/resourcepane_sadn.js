function add_sadn_resource_body(tab_id) {
    var tab_body = $(`
        <div id="` + tab_id + `_body" class="resource_pane_tab_content">
            <div class="form-group">
                <label>SADN Editor</label>
                <textarea id="` + tab_id + `" class="form-control" placeholder="Describe your argument using SADN notation here..." rows="20"></textarea>
                <button type="button" class="btn btn-default" title="Add node from text selection" onclick="parse_sadn_input('` + tab_id + `');">Parse</button>
            </div>
        </div>
    `); 
    $(".tab_body").append(tab_body);
}

function parse_sadn_input(tab_id) {
    var lines = ws(document.getElementById(tab_id).value).split('\n');
    for(var i = 0;i < lines.length;i++){
        fields = lines[i].split(':');
        var head = fields[0];
        if (head.length > 0)
        {
            var body = fields[1];
            console.log(i+": HEAD="+head+", BODY="+body);
            body = ltrim(body);
            if ( body.startsWith('"') == true ) { console.log("ATOM: " + body); }
            else { 
                console.log("RULE");
                var type = null;
                if (body.includes('}') )
                {
                    type = "}";
                                }
                else if ( body.includes('>') )
                {
                    type = ">";
                }
                console.log("TYPE: " + type);
                var components = body.split(type);
                var premises = components[0].split(',');
                var conclusion = components[1];
                console.log("PREMISES:");
                for (var p in premises) {
                    console.log(premises[p]);
                }
                console.log("CONCLUSION: " + conclusion);
            }
        }

    }
}

function ltrim(str) {
    if(str == null) return null;
    return str.replace(/^\s+/g, '');
}

function ws(str) {
    return str.replace(/^\s*[\r\n]/gm, '');
}

function endings(str) {
    return str.replace(/(\r\n|\n|\r)/gm, '');
}

function empty(array) {
    return array.filter(function(n){ return n != undefined });
}

