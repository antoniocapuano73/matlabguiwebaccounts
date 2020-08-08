export function setTagPropertyEnabled(idTag,status) {
    let that = this;

    try {

        let idParent = idTag;
        let disabled = !status;

        let setNode = function (node,disabled) {
            if (node) {
                node.disabled = disabled;
                setChildNodes(node.getElementsByTagName('*'),disabled);
            }
        }

        let setChildNodes = function (childNodes,disabled) {
            if (childNodes)
                for (var node of childNodes) {
                    setNode(node,disabled);
            }
        };

        setNode(document.getElementById(idParent),disabled);

    }
    catch (e) {
        console.log("UtilityTag.setTagPropertyEnabled function");
        console.log(e);
    }


  }