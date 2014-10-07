<?php require_once( 'templates/default-header.php'); ?>
<div class="jumbotron">
    <div id="chat-area">
        <div class="input-prepend">
            <span class="add-on" id="user-name">
                <span class="glyphicon glyphicon-user"></span> 
            </span>
            <div class="input-group">
                <!--
                <input type="text" id="textbox" class="form-control" placeholder="＾v＾ < えふっえふっ">
                -->
                <input type="text" id="textbox" class="form-control" placeholder="いまなにしてる？">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button">つぶやく</button>
                </span>
            </div>
        </div>
    </div>
</div>

<div class="row marketing">
    <ul id="chat-history" class="list-unstyled row-fluid col-lg-12"></ul>
</div>
<?php require_once( 'templates/default-footer.php'); ?>
