var F_Git = {
    vars: {
        gitURLContent : 'https://api.github.com/repos/',
        gitURLSearch : 'https://api.github.com/search/code?q=repo:'
    },
    init: function() {
        F_Git.vars.gitUser = 'sebastiantiede';
        F_Git.vars.gitRepo = 'whatthefact';

        F_Git.vars.gitURLContent = F_Git.vars.gitURLContent+F_Git.vars.gitUser+'/'+F_Git.vars.gitRepo+'/contents';

        F_Git.vars.gitURLSearch = F_Git.vars.gitURLSearch+F_Git.vars.gitUser+'/'+F_Git.vars.gitRepo;

        return;
        F_Git.folder('/data/facts/' + F_Git.languageSelector(), function(data) {
            $.each(data._data, function(i, file) {
                file.file(null, function(data) {
                    console.log(data);
                });
            });
        });

        F_Git.search('Welt schön', function(data) {
            console.log(data);
        });
        F_Git.searchFile('test', function(data) {
            console.log(data);
        });


    },
    languageSelector: function() {
        var lang = navigator.language || navigator.userLanguage;
        return lang + '_' + lang.toUpperCase();
    },
    folder: function(folder, onload) {
        $.get(
            F_Git.vars.gitURLContent+folder,
            function(data) {
                var thisFns = F_Git;

                var _data = [];
                $.each(data, function(i, file) {
                    file
                    _data[i] = Object.assign(file, thisFns);
                });

                data = Object.assign({_data : _data}, thisFns);
                onload(data);
            },
            'json'
        );
    },
    file: function(file, onload) {
        var fileUrl = file || this.download_url,
            fileType = fileUrl.match(/([^\.]+)$/)[1] || null;

        $regex = new RegExp('(http(s)?:\/\/)github\.com(\/'+F_Git.vars.gitUser+'\/'+F_Git.vars.gitRepo+')\/blob', 'i');
        fileUrl = fileUrl.replace($regex, '$1raw.githubusercontent.com$3');

        $.get(
            fileUrl,
            onload,
            fileType
        );
    },
    search: function(query, onload) {
        query = query.replace(/\s/,'+');

        $.get(
            F_Git.vars.gitURLSearch+'+'+query,
            function(data) {
                var thisFns = F_Git;

                var _data = [];
                $.each(data.items, function(i, file) {
                    file
                    _data[i] = Object.assign(file, thisFns);
                });

                data = Object.assign({_data : _data}, thisFns);
                onload(data);
            },
            'json'
        );

        //https://api.github.com/search/code?q=repo:sebastiantiede/facts+welt
    },
    searchFile: function(query, onload) {
        query = query.replace(/\s/,'+');
        this.search(query+'+in:path', onload);
    }
}
