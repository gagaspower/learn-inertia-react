<?php

namespace App\Services;

use App\Models\ProductPasca;
use App\Models\ProductPrabayar;

class GetAllProductAliases
{
    protected $product_type;

    public function __construct($product_type = null)
    {
        $this->product_type = $product_type;
    }

    public function _getGet()
    {
        $result = [];

        if ($this->product_type === 'Prabayar') {
            $prabayar = $this->_brand_prabayar();
            if ($prabayar) {
                foreach ($prabayar as $p) {
                    array_push($result, $p);
                }
            }
        } elseif ($this->product_type === 'Pascabayar') {
            $pascabayar = $this->_brand_pascabayar();
            if ($pascabayar) {
                foreach ($pascabayar as $pasca) {
                    array_push($result, $pasca);
                }
            }
        } else {
            $prabayar = $this->_brand_prabayar();
            if ($prabayar) {
                foreach ($prabayar as $p) {
                    array_push($result, $p);
                }
            }

            $pascabayar = $this->_brand_pascabayar();
            if ($pascabayar) {
                foreach ($pascabayar as $pasca) {
                    array_push($result, $pasca);
                }
            }
        }

        return $result;
    }

    protected function _brand_prabayar()
    {
        $data = ProductPrabayar::select('product_brand')->distinct()->pluck('product_brand');

        return $data;
    }

    protected function _brand_pascabayar()
    {
        $data = ProductPasca::select('product_brand')->distinct()->pluck('product_brand');

        return $data;
    }
}
