(function(){
    $(document).foundation();

    _post_api_url         = '/post';

    $new_post_form        = $('#new_post');
    _new_post_field       = '.post__new_post';
    _new_post__size_limit = 140;

    var $make_request = function (URL, METHOD, DATA, CALLBACK) {

        fetch(URL, {
            method  : METHOD,
            credentials : 'same-origin',
            headers : {
                'Accept'       : 'application/json',
                'Content-Type' : 'application/json'
            },
            body    : JSON.stringify(DATA)
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            CALLBACK(json)
        }).catch(function (err) {
            CALLBACK({'status': 'failed', 'error': err})
        })
    }

    var $api = {
        'get' : function (ID, CALLBACK) {
            _URL = _post_api_url;
            if(ID && typeof ID === 'number')
                _URL += '/' + ID;

            $make_request(_URL, 'GET', {}, CALLBACK);
        },

        'add' : function (DATA, CALLBACK) {
            $make_request(_post_api_url, 'POST', DATA, CALLBACK);
        },


        'update' : function (ID, DATA, CALLBACK) {
            if (typeof ID !== 'number' || !DATA)
                // throw Error
            else {
                _URL = _post_api_url + '/' + ID;
                $make_request(_URL, 'PUT', DATA, CALLBACK);
            }
        },

        'delete' : function (ID, CALLBACK) {
            if (typeof ID !== number)
                // throw Error
                console.log('ID is no set')
            else {
                _URL = _post_api_url + '/' + ID;
                $make_request(_URL, 'DELETE', {}, CALLBACK);
            }
        }
    }

    $new_post_form.submit(function (event) {
        event.preventDefault();
        var content = $(_new_post_field, this).val();

        if(content && content.length <= _new_post__size_limit)
            $api.add({'text': content}, (data) => console.log(data));
    })
})()