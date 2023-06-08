

<?php

header('Access-Control-Allow-Origin: *');


// Установите API-ключ
$api_key = "b18c2db3-d1eb-47aa-8d30-0d8dc8fa9b88";

// Установите координаты местоположения
$latitude = 55.75396;
$longitude = 37.620393;

// Сформируйте URL-адрес для выполнения запроса к API
$url = "https://api.weather.yandex.ru/v2/informers?lat={$latitude}&lon={$longitude}";//https://api.weather.yandex.ru/v2/informers/
    
// Установите заголовки для выполнения запроса
$options = [
    'http' => [
        'header' => "X-Yandex-API-Key: {$api_key}\r\n"
    ]
]; 

$context = stream_context_create($options) ;

// Выполните запрос к API и получите ответ
$response = file_get_contents($url, false, $context);

// Разберите ответ и получите данные о погоде
$data = json_decode($response, true);

// Выведите данные о погоде
echo 'Погода в Москве: ' . $data['fact']['temp'] . ' градусов по Цельсию.';

// file_get_contents('https://api.weather.yandex.ru/v2/informers?');
