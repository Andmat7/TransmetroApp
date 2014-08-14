<body>
  <div class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Transmetro</a>
      </div>

    </div>
  </div>


  <div class="container">

    <!-- Main component for a primary marketing message or call to action -->
    <div class="jumbotron">
      <p>Por favor suba el archivo GTFS.zip, Recuerde que el proceso puede tomar varias horas.</p>
        <?php echo $error;?>

        <?php echo form_open_multipart('upload/do_upload');?>
          <div class="form-group">
            <label for="exampleInputFile">Archivo GTFS</label>
            <input type="file" id="exampleInputFile">
          </div>
          
          <button type="submit" class="btn btn-default">Subir archivo</button>
        </form>
      </div>
    </div>

  </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    
  </body>
