class HTMLComponentBase extends HTMLElement{
    get config(){
        return require("./../config/config");
    }

    get dom(){
        return require("./../utils/dom");
    }

    get safe_i18n(){
        return (langpath) =>
        {
            const errormsg = "LANG ERROR";
            var pathstr = String(langpath);
            var splitpath = pathstr.split("/");
            
            if(splitpath[0] == ".")
            {
                splitpath[0] = this.config.user.language;
            }
            else if(splitpath[0] == "..")
            {
                //use fallback
                splitpath[0] = this.config.language;
            }

            var prop = this.config.i18n[splitpath[0]];
            if(typeof prop == "undefined")
            {
                console.error("there is no language \"" + splitpath[0] + "\" -> using fallback (" + this.config.language + ")");
                
                if(typeof this.config.language == "undefined")
                {
                    console.error("failed using fallback language");
                    return errormsg;
                }
                else
                {
                    splitpath[0] = this.config.language;
                    prop = this.config.i18n[splitpath[0]];
                }
            }
            

            const tryGet = (obj, segments) => {
                for(var i = 1; i < segments.length; i++)
                {
                     obj = obj[segments[i]];
                }
                return obj;
            }

            prop = tryGet(prop, splitpath);
            if(typeof prop == "undefined")
            {
                if(splitpath[0] != this.config.language)
                {
                    console.error("there is no language property for \"" + pathstr + "\" in\"" + splitpath[0] + "\" -> trying fallback (" + this.config.language + ")");

                    splitpath[0] = this.config.language;
                    prop = this.config.i18n[splitpath[0]];
                    prop = tryGet(prop, splitpath);

                    if(typeof prop == "undefined")
                    {
                        prop = errormsg;
                        console.error("failed using fallback language (" + this.config.language + ")");
                    }
                }
                else
                {
                    prop = errormsg;
                    console.error("there is no language property for \"" + pathstr + "\" in language (" + this.config.language + "). No fallback!");
                }
            }
            
            return prop;
        }
    }

    appendChildren()
    {
        var expandedArgs = arguments;
        var need2expand = true;
        while(need2expand)
        {
            need2expand = false;
            var temp = [];

            for(var i = 0; i < expandedArgs.length; i++)
            {
                if(Array.isArray(expandedArgs[i]))
                {
                    need2expand = true;

                    for(var j = 0; j < expandedArgs[i].length; j++)
                    {
                        temp.push(expandedArgs[i][j]);
                    }
                }
                else
                {
                    temp.push(expandedArgs[i]);
                }
            }

            expandedArgs = temp;
        }

        this.appendChildrenNoExp(expandedArgs);
    }

    //appendChildrenNoExpand
    appendChildrenNoExp()
    {
        var children = [];
        if(arguments.length == 1 && Array.isArray(arguments[0]))
        {
            children = arguments[0];
        }
        else
        {
            children = Array.from(arguments);
        }

        for(var i = 0; i < children.length; i++)
        {
            this.appendChild(children[i]);
        }
    }
}
module.exports = HTMLComponentBase;