(function() {
    
    function atypeof(value) {
        var s = typeof value;
        if (s === 'object') {
            if (value) {
                if (value instanceof Array) {
                    s = 'array';
                }
            } else {
                s = 'null';
            }
        }
        return s;
    }
    
    var jst = {};
    
    jst.json = {"employee":{"gid":102,
        "companyID":121,
        "defaultActionID":444,
        "names":{"firstName":"Stive",
        "middleInitial":"Jr",
        "lastName":"Martin"},
        "address":{"city":"Albany",
        "state":"NY",
        "zipCode":"14410-585",
        "addreess":"41 State Street"},
        "job":{"departmentID":102,
        "jobTitleID":100,
        "hireDate":"1/02/2000",
        "terminationDate":"1/12/2007"},
        "contact":{"phoneHome":"12-123-2133",
        "beeper":"5656",
        "email1":"info@soft-amis.com",
        "fax":"21-321-23223",
        "phoneMobile":"32-434-3433",
        "phoneOffice":"82-900-8993"},
        "login":{"employeeID":"eID102",
        "password":"password",
        "superUser":true,
        "lastLoginDate":"1/12/2007",
        "text":"text",
        "regexp":{},
        "date":{}},
        "comment":{"PCDATA":"comment"},
        "roles":[{"role":102},
        {"role":103}]}};
        
    window.jsontamer = jst;
    
    jst.load = function() {
        jst.parse(jst.json);
    };
    
    jst.saveClicked = function() {
        var tree = document.getElementById('tree');
        var editValue = document.getElementById('edit_value');
        console.log(JSON.parse(editValue.getAttribute('value')));
        jst.json = JSON.parse(editValue.getAttribute('value'));
        console.log(jst.json);
        jst.parse(jst.json);
    };
    
    jst.parse = function(json) {
        var tc = document.getElementById('treechildren');
      
        while (tc.hasChildNodes()) {
          treechildren.removeChild(tc.lastChild);
        }
      
        var tree = document.getElementById('tree').treeBoxObject;
        tree.beginUpdateBatch();
        jst.recursiveDOM(json, "Root", tc);
        tree.endUpdateBatch();
      
        if (tc.firstChild) tc.firstChild.setAttribute('open', 'true');
    };

    jst.recursiveDOM = function(obj, name, parent) {
        var treeitem = document.createElement('treeitem');
        var row = document.createElement('treerow');
        row.setAttribute("nodeData", JSON.stringify(obj) );
      
        var key = document.createElement('treecell');
        key.setAttribute("label", name);
        key.setAttribute("properties", atypeof(obj));
        row.appendChild(key);
    
        var value = document.createElement('treecell');
        value.setAttribute("label", jst.getLabel(obj));
        row.appendChild(value);
        treeitem.appendChild(row);
      
        if ( typeof(obj) === 'object' ) {    
            treeitem.setAttribute("container", "true");
            var tc = document.createElement('treechildren');
            for (var i in obj) {
                jst.recursiveDOM(obj[i], i, tc);
            }
            treeitem.appendChild(tc);
        }

        parent.appendChild(treeitem);
    };
    
    jst.getLabel = function(obj) {
        switch (atypeof(obj)) {
            case 'string':
                return '"'+ obj.toString() +'"';
            case 'number':
                return obj;
            case 'object':
            case 'array':
                return JSON.stringify(obj);
            case 'boolean':
                return obj.toString();
            default:
                return 'Unknown:'+ obj.toString();
        }
        return;
    };

    jst.onRowSelect = function() {
        var tree = document.getElementById('tree');
        var selected = tree.getElementsByTagName('treeitem')[tree.currentIndex];
        console.log('%o', selected);
        
        if (tree.currentIndex === 0) {
            var editValue = document.getElementById('edit_value');
            editValue.setAttribute('value', JSON.stringify(jst.json));
        }
    }
    
})();