<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Index extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        /*Additional code which you want to run automatically in every function call */
    }
    public function index()
    {
        $this->load->view('includes/header');
        $this->load->view('login');
        $this->load->view('includes/footer');
    }
    public function upload_zip()
    {
        $this->load->view('includes/header');
        $this->load->view('upload_zip', array('error' => ' ' ));
        $this->load->view('includes/footer');
    }

}

/* End of file index.php */
/* Location: ./application/controllers/index.php */