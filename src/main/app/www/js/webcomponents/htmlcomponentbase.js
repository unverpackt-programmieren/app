class HTMLComponentBase extends HTMLElement{
    static get config(){
        return require("./../config/config");
    }

    static get dom(){
        return require("./../utils/dom");
    }

    static get safe_i18n(){
        return (langpath) =>
        {
            const errormsg = "LANG ERROR";
            var pathstr = String(langpath);
            var splitpath = pathstr.split("/");
            
            if(splitpath[0] == ".")
            {
                splitpath[0] = HTMLComponentBase.config.user.language;
            }
            else if(splitpath[0] == "..")
            {
                //use fallback
                splitpath[0] = HTMLComponentBase.config.language;
            }

            var prop = HTMLComponentBase.config.i18n[splitpath[0]];
            if(typeof prop == "undefined")
            {
                console.error("there is no language \"" + splitpath[0] + "\" -> using fallback (" + HTMLComponentBase.config.language + ")");
                
                if(typeof HTMLComponentBase.config.language == "undefined")
                {
                    console.error("failed using fallback language");
                    return errormsg;
                }
                else
                {
                    splitpath[0] = HTMLComponentBase.config.language;
                    prop = HTMLComponentBase.config.i18n[splitpath[0]];
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
                if(splitpath[0] != HTMLComponentBase.config.language)
                {
                    console.error("there is no language property for \"" + pathstr + "\" in\"" + splitpath[0] + "\" -> trying fallback (" + HTMLComponentBase.config.language + ")");

                    splitpath[0] = HTMLComponentBase.config.language;
                    prop = HTMLComponentBase.config.i18n[splitpath[0]];
                    prop = tryGet(prop, splitpath);

                    if(typeof prop == "undefined")
                    {
                        prop = errormsg;
                        console.error("failed using fallback language (" + HTMLComponentBase.config.language + ")");
                    }
                }
                else
                {
                    prop = errormsg;
                    console.error("there is no language property for \"" + pathstr + "\" in language (" + HTMLComponentBase.config.language + "). No fallback!");
                }
            }
            
            return prop;
        }
    }
}
module.exports = HTMLComponentBase;