'use strict'; // code generated by pbf v3.2.1

// Profile ========================================

var Profile = exports.Profile = {};

Profile.read = function (pbf, end) {
    return pbf.readFields(Profile._readField, {graph: null, system: null, minecraft: null, gcs: []}, end);
};
Profile._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.graph = Profile.Graph.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2) obj.system = Profile.SystemInfo.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 3) obj.minecraft = Profile.MinecraftInfo.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 4) obj.gcs.push(Profile.GC.read(pbf, pbf.readVarint() + pbf.pos));
};

// Profile.Graph ========================================

Profile.Graph = {};

Profile.Graph.read = function (pbf, end) {
    return pbf.readFields(Profile.Graph._readField, {data: []}, end);
};
Profile.Graph._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.data.push(Profile.Graph.GraphData.read(pbf, pbf.readVarint() + pbf.pos));
};

// Profile.Graph.GraphData ========================================

Profile.Graph.GraphData = {};

Profile.Graph.GraphData.read = function (pbf, end) {
    return pbf.readFields(Profile.Graph.GraphData._readField, {id: "", name: "", time: 0, data: 0}, end);
};
Profile.Graph.GraphData._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.id = pbf.readString();
    else if (tag === 2) obj.name = pbf.readString();
    else if (tag === 3) obj.time = pbf.readVarint();
    else if (tag === 4) obj.data = pbf.readDouble();
};

// Profile.SystemInfo ========================================

Profile.SystemInfo = {};

Profile.SystemInfo.read = function (pbf, end) {
    return pbf.readFields(Profile.SystemInfo._readField, {vm: null, cpu: null, memory: null, os: null}, end);
};
Profile.SystemInfo._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.vm = Profile.SystemInfo.VMInfo.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 2) obj.cpu = Profile.SystemInfo.CPU.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 3) obj.memory = Profile.SystemInfo.Memory.read(pbf, pbf.readVarint() + pbf.pos);
    else if (tag === 4) obj.os = Profile.SystemInfo.OS.read(pbf, pbf.readVarint() + pbf.pos);
};

// Profile.SystemInfo.VMInfo ========================================

Profile.SystemInfo.VMInfo = {};

Profile.SystemInfo.VMInfo.read = function (pbf, end) {
    return pbf.readFields(Profile.SystemInfo.VMInfo._readField, {version: "", vendor: "", vm: "", runtime_name: "", runtime_version: "", flags: []}, end);
};
Profile.SystemInfo.VMInfo._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.version = pbf.readString();
    else if (tag === 2) obj.vendor = pbf.readString();
    else if (tag === 3) obj.vm = pbf.readString();
    else if (tag === 4) obj.runtime_name = pbf.readString();
    else if (tag === 5) obj.runtime_version = pbf.readString();
    else if (tag === 6) obj.flags.push(pbf.readString());
};

// Profile.SystemInfo.CPU ========================================

Profile.SystemInfo.CPU = {};

Profile.SystemInfo.CPU.read = function (pbf, end) {
    return pbf.readFields(Profile.SystemInfo.CPU._readField, {model: "", cores: 0, threads: 0, frequency: 0}, end);
};
Profile.SystemInfo.CPU._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.model = pbf.readString();
    else if (tag === 2) obj.cores = pbf.readVarint();
    else if (tag === 3) obj.threads = pbf.readVarint();
    else if (tag === 4) obj.frequency = pbf.readVarint();
};

// Profile.SystemInfo.Memory ========================================

Profile.SystemInfo.Memory = {};

Profile.SystemInfo.Memory.read = function (pbf, end) {
    return pbf.readFields(Profile.SystemInfo.Memory._readField, {physical: 0, swap: 0, virtual: 0, debug_symbols: false}, end);
};
Profile.SystemInfo.Memory._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.physical = pbf.readVarint();
    else if (tag === 2) obj.swap = pbf.readVarint();
    else if (tag === 3) obj.virtual = pbf.readVarint();
    else if (tag === 4) obj.debug_symbols = pbf.readBoolean();
};

// Profile.SystemInfo.OS ========================================

Profile.SystemInfo.OS = {};

Profile.SystemInfo.OS.read = function (pbf, end) {
    return pbf.readFields(Profile.SystemInfo.OS._readField, {manufacturer: "", family: "", version: "", bitness: 0}, end);
};
Profile.SystemInfo.OS._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.manufacturer = pbf.readString();
    else if (tag === 2) obj.family = pbf.readString();
    else if (tag === 3) obj.version = pbf.readString();
    else if (tag === 4) obj.bitness = pbf.readVarint();
};

// Profile.MinecraftInfo ========================================

Profile.MinecraftInfo = {};

Profile.MinecraftInfo.read = function (pbf, end) {
    return pbf.readFields(Profile.MinecraftInfo._readField, {version: "", online_mode: 0, configs: [], plugins: []}, end);
};
Profile.MinecraftInfo._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.version = pbf.readString();
    else if (tag === 2) obj.online_mode = pbf.readVarint();
    else if (tag === 3) obj.configs.push(Profile.MinecraftInfo.Config.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 4) obj.plugins.push(Profile.MinecraftInfo.Plugin.read(pbf, pbf.readVarint() + pbf.pos));
};

Profile.MinecraftInfo.OnlineMode = {
    "ENABLED": {
        "value": 0,
        "options": {}
    },
    "DISABLED": {
        "value": 1,
        "options": {}
    },
    "BUNGEE": {
        "value": 2,
        "options": {}
    },
    "VELOCITY": {
        "value": 3,
        "options": {}
    }
};

// Profile.MinecraftInfo.Config ========================================

Profile.MinecraftInfo.Config = {};

Profile.MinecraftInfo.Config.read = function (pbf, end) {
    return pbf.readFields(Profile.MinecraftInfo.Config._readField, {file: "", content: ""}, end);
};
Profile.MinecraftInfo.Config._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.file = pbf.readString();
    else if (tag === 2) obj.content = pbf.readString();
};

// Profile.MinecraftInfo.Plugin ========================================

Profile.MinecraftInfo.Plugin = {};

Profile.MinecraftInfo.Plugin.read = function (pbf, end) {
    return pbf.readFields(Profile.MinecraftInfo.Plugin._readField, {name: "", version: "", author: ""}, end);
};
Profile.MinecraftInfo.Plugin._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.name = pbf.readString();
    else if (tag === 2) obj.version = pbf.readString();
    else if (tag === 3) obj.author = pbf.readString();
};

// Profile.GC ========================================

Profile.GC = {};

Profile.GC.read = function (pbf, end) {
    return pbf.readFields(Profile.GC._readField, {name: "", total: 0, time: 0, frequency: 0}, end);
};
Profile.GC._readField = function (tag, obj, pbf) {
    if (tag === 1) obj.name = pbf.readString();
    else if (tag === 2) obj.total = pbf.readVarint();
    else if (tag === 3) obj.time = pbf.readDouble();
    else if (tag === 4) obj.frequency = pbf.readVarint();
};
