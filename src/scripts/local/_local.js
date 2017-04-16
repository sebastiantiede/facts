var F_Local = {
    local: false,
    init: function() {
        F_Local.local = F_Local[F_Git.languageSelector()];
    },
    __: function(string) {

    }
};

function __(string) {
    return F_Local.__(string);
}
