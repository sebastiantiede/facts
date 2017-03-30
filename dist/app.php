<?php
$autoload = __DIR__.'/vendor/autoload.php';
if(file_exists($autoload)) {
    require $autoload;
} else {
    die('Please enter <code>composer install</code> in your command line interface.');
}


/**
* Description for GO
* @class GO
* @constructor
*/
class GO {
    public $codes = array();

    /**
    * Description for __construct
    * @private
    * @method __construct
    * @return null
    */
    function __construct() {
        $provided_code = $this->setCodes();
        $provided_code = $this->validate();

        //$provided_code = $this->download();


        if(isset($this->codes[$provided_code])) {
            $url = $this->codes[$provided_code];
            if(isset($_POST['full_app'])) {
                $this->media_provider($url);
            } else {
                header("Location: ".$url);
                echo 'You’ll get redirected!';
                exit;
            }
        } else {
            $this->error('Not found!');
        }

    }

    /**
    * Description for setCodes
    * @private
    * @method setCodes
    * @return null
    */
    function setCodes() {
        $objReader = PHPExcel_IOFactory::createReader('Excel2007');
        $objReader->setReadDataOnly(true);

        $objPHPExcel = $objReader->load("codes.xlsx");
        $objWorksheet = $objPHPExcel->getActiveSheet();

        $highestRow = $objWorksheet->getHighestRow();
        $highestColumn = $objWorksheet->getHighestColumn();

        $highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);

        for ($row = 1; $row <= $highestRow; ++$row) {
            $key = $objWorksheet->getCellByColumnAndRow(0, $row)->getValue();
            $val = $objWorksheet->getCellByColumnAndRow(1, $row)->getValue();
            if($key !== 'Codes' && $key !== null && $val != null) {
                $this->codes[$key] = $val;
            }
        }
    }

    /**
    * Description for media_provider
    * @private
    * @method media_provider
    * @param {Object} $url = false
    * @return {Object} description
    */
    function media_provider($url = false) {
        if(!$url) {
            $this->error('Not found!');
        }

        switch(true) {
            // Audio
            case preg_match('/\.(mp3|oga|m4a)$/', $url, $match):
                $out = array(
                    'type' => 'audio',
                    'result' => $url
                );
                break;
            // Video
            case preg_match('/\.(mp4|ogv|webm|m4v|flv)$/', $url, $match):
                $out = array(
                    'type' => 'video',
                    'result' => $url
                );
                break;
            // Audio
            case preg_match('/\.(m4a|mp3)$/', $url, $match):
                $out = array(
                    'type' => 'audio',
                    'result' => $url
                );
                break;
            // Vimeo
            case preg_match('/https?:\/\/(www\.)?(vimeo\.com)\/(?<vimeo_id>[\d|\w]+)/', $url, $match):
                $out = array(
                    'type' => 'embed',
                    'result' => sprintf(
                        '<iframe src="https://player.vimeo.com/video/%s?color=285596&portrait=0&badge=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                        $match['vimeo_id']
                    )
                );
                break;
            // YouTube
            case preg_match('/https?:\/\/(www\.)?(youtube\.com|youtu.be).*\?v=(?<youtube_id>[\d|\w]+)/', $url, $match):
                $out = array(
                    'type' => 'embed',
                    'result' => sprintf(
                        '<iframe src="https://www.youtube.com/embed/%s" frameborder="0" allowfullscreen></iframe>',
                        $match['youtube_id']
                    )
                );
                break;
            default:
                if($this->is_iframe_ready($url)) {
                    $out = array(
                        'type' => 'iframe',
                        'result' => $url,
                    );
                } else {
                    $out = array(
                        'type' => 'url',
                        'result' => $url,
                    );
                }

                break;
        }

        $out['result_type'] = 'success';

        header('Content-Type: application/json');
        echo json_encode($out);
    }


    /**
    * Description for validate
    * @private
    * @method validate
    * @return {Object} description
    */
    function validate() {
        if(!isset($_POST['code'])) {
            $this->error('Nice try!');
        }

        $code = intval(implode($_POST['code']));

        if($code >= 0 ) {
            return $code;
        } else {
            $this->error('Nice try!');
        }
    }

    /**
    * Description for is_iframe_ready
    * @private
    * @method is_iframe_ready
    * @param {Object} $url
    * @return {Object} description
    */
    function is_iframe_ready($url) {
        $error = false;
        $ch = curl_init();

        $options = array(
                CURLOPT_URL            => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_HEADER         => true,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_ENCODING       => "",
                CURLOPT_AUTOREFERER    => true,
                CURLOPT_CONNECTTIMEOUT => 120,
                CURLOPT_TIMEOUT        => 120,
                CURLOPT_MAXREDIRS      => 10,
        );
        curl_setopt_array($ch, $options);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch);
        $headers = substr($response, 0, $httpCode['header_size']);
        if(preg_match('/X-Frame-Options: deny/i', $headers) || preg_match('/X-Frame-Options: SAMEORIGIN/i', $headers)) {
            $error = true;
        }

        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if(!$httpcode) {
            $this->error('URL not found!');
        }

        curl_close($ch);

        return !$error;
    }

    /**
    * Description for error
    * @private
    * @method error
    * @param {Object} $content
    * @return {Object} description
    */
    function error($content) {
        header('Content-Type: application/json');
        echo json_encode(array(
            'result_type' => 'error',
            'response' => $content
        ));
        exit;
    }
}

new GO();
