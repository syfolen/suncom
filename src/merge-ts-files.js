
"use strict";

/**
 * input node merge-ts-files dir-root to work
 */

const fs = require("fs");

console.log("begin merge ts files ...");

const args = process.argv.splice(2);

console.log("args:" + args.join(" "));

let output_str = "";

const infos = [];
const rootName = args[0];

merge_dir(rootName);
console.log("");
output_script(rootName, infos);

function merge_dir(root) {
    const dirs = fs.readdirSync(root);
    for (const dir of dirs) {
        const path = root + "/" + dir;
        const stat = fs.lstatSync(path);
        if (stat.isDirectory() == true) {
            // console.log(path + " is directory");
            merge_dir(path);
        }
        else {
            // console.log("merge " + path);
            console.log("");
            merge_file(path);
        }
    }
}

function output_enums(enums) {
    for (const item of enums) {
        console.log("output enum => " + item.name);
        output_str += item.data;
    }
}

function output_interfaces(interfaces) {
    for (const item of interfaces) {
        console.log("output interface => " + item.name);
        output_str += item.data;
    }
}

function output_classes(classes) {
    for (const item of classes) {
        console.log("output class => " + item.name);
        output_str += item.data;
    }
}

function output_script(rootName, infos) {
    const enums = [];
    for (const info of infos) {
        if (info.type == "enum") {
            enums.push(info);
        }
    }
    output_enums(enums);

    const interfaces = [];
    for (const info of infos) {
        if (info.type == "interface") {
            interfaces.push(info);
        }
    }
    output_interfaces(interfaces);

    const classes = [];
    for (const info of infos) {
        if (info.type == "class") {
            classes.push(info);
        }
    }
    output_classes(classes);

    fs.writeFileSync(rootName + ".ts", output_str);
}

function return_script_by_name(name) {
    for (const info of infos) {
        if (info.name == name) {
            return info.data;
        }
    }
    throw Error("unknow script name:" + name);
}

function sort_script(infos) {

}

function sort_interface(infos) {

}

function merge_file(path) {
    const data = fs.readFileSync(path).toString();

    const script = remove_module_name_from_script(data);
    const config = manage_as_enum_or_class_or_interface(script);
    // console.log(typeof config, config.type, config.name, config.interfaces, Object.keys(config));

    infos.push(config);
}

function manage_as_enum_or_class_or_interface(data) {
    const types = ["enum", "class", "interface"];

    let str = remove_abstract_string(get_defination_string(data));

    const array = str.split(" ");
    remove_empty_or_null_items_of_array(array);

    const type = array[0];
    const name = array[1];

    if (array.length > 2) {
        array.shift();
        array.shift();
        array.shift();
    }
    else {
        array.length = 0;
    }

    console.log("str => " + str);
    console.log("type => " + type);
    console.log("name => " + name);
    console.log("interfaces => " + array);

    const item = { type: type, name: name, interfaces: array, data: data };
    // console.log(typeof item, item.type, item.name, item.interfaces, Object.keys(item));

    return item;
}

function remove_abstract_string(data) {
    const key = "abstract ";
    const index = data.indexOf(key);
    if (index == -1) {
        return data;
    }
    return data.substr(index + key.length);
}

function get_defination_string(data) {
    const key = "export ";
    const index = data.indexOf(key);

    if (index == -1) {
        throw Error("error script" + data);
    }

    const begin = index + key.length;
    const end = data.indexOf("{", begin);

    const str = data.substring(begin, end);
    return str;
}

function remove_module_name_from_script(data) {
    const begin = data.indexOf("module");
    if (begin == -1) {
        return data;
    }

    const end = data.indexOf("{");
    data = data.substr(end + 1);

    const index = data.lastIndexOf("}");
    data = data.substr(0, index);

    const a = data.indexOf("\r\n");
    const b = data.indexOf("export");

    if (a > -1 && a < b) {
        data = data.substr(a + 2);
    }

    return data;
}

function trim(str) {
    const array = str.split("");
    while (array[0] == " ") {
        array.shift();
    }
    while (array[array.length - 1] == " ") {
        array.pop();
    }
    return array.join("");
}

function remove_empty_or_null_items_of_array(array) {
    for (let i = array.length - 1; i > -1; i--) {
        if (array[i] === "" || array[i] === void 0 || array[i] === null) {
            array.splice(i, 1);
        }
    }
}