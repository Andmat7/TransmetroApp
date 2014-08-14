<?php

class Upload extends CI_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    function index()
    {
        $this->load->view('upload_form', array('error' => ' ' ));
        
    }

    function do_upload()
    {   
        
        

        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = '*';
        $config['max_size'] = '200000';
        

        $this->load->library('upload', $config);
        $this->delete_zip_GTFS();
        if ( ! $this->upload->do_upload())
        {
            $error = array('error' => $this->upload->display_errors());

            $this->load->view('upload_form', $error);
        }
        else
        {

            $data = array('upload_data' => $this->upload->data());
            $zip = new ZipArchive;
            
             $res = $zip->open($data['upload_data']['full_path']);
             
            if($res==TRUE)
                {
                    $zip->extractTo('./uploads/GTFS_txt');
                  

                    $zip->close();
                }
                
            $this->load->view('includes/header');

            $this->load->view('upload_success', $data);
            
            $this->load->view('includes/footer');
      //      $this->
        }

    }
    private function delete_zip_GTFS()
    {
        //echo "algo";
        $path= realpath ("./");
        $file_name=$path.'/uploads/GTFS.zip';
        //echo $path;
        
        if (file_exists($file_name)) {
            
            if(is_readable($file_name)){
                unlink($file_name);
                return true;
            }else{
                echo "Error:No tiene permisos de escritura";
                exit();
            }
            
        }
    }
    public function execute_sql()
    {
        $tiempo_inicio = $this->microtime_float();
        $CI =& get_instance();  
        $CI->load->database();  
        $this->db->cache_off();
        $path= realpath (".");
        if ($CI->db->password!="") {
            $command = "mysql -u".$CI->db->username." -p".$CI->db->password." -h ".$CI->db->hostname." < ".$path."/sql/GTFS.sql";
        }else{
            $command = "C:\\xampp\\mysql\\bin>mysql.exe -u".$CI->db->username." -h ".$CI->db->hostname." < ".$path."/sql/GTFS.sql";
        }
        
        //echo $command;
        //exit;

        $output = shell_exec($command);
        
        $tiempo_fin = $this->microtime_float();
        $tiempo = $tiempo_fin - $tiempo_inicio;
        $salida=array("already"=>true,"message_already"=> "Creada base de datos","next_message"=>"Creando base de datos","tiempo"=>($tiempo_fin - $tiempo_inicio));
        //echo "<br>Tiempo empleado: " . ($tiempo_fin - $tiempo_inicio);

        echo json_encode($salida);
        exit();
    }
    function microtime_float()
    {
        list($useg, $seg) = explode(" ", microtime());
        return ((float)$useg + (float)$seg);
    }

}

?>