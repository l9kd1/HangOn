var createNewCourse = function(e){

  $("#createNewCourseButton").hide(1,()=>{$("#addLoadingIcon").show(1);});
  var sendData = {
    name:$("#courseNameField").val(),
    advancements:[]
  };
  if($("#examsField").val()!=0){
    sendData.advancements.push({
      type:"Examens",
      maxvalue:$("#examsField").val(),
      value:0
    });
  }

  var elem = $("#typeField .active");

  for(var i=0;i<elem.length;i++){
    sendData.advancements.push({
      type:elem[i].firstChild.value,
      maxvalue:$("#weeksField").val(),
      value:0
    });
  }

  $.ajax({
    url:"course",
    method:"POST",
    contentType: "application/json",
    data:JSON.stringify(sendData),
    success: (data)=>{
      $("#addLoadingIcon").hide(1,()=>{
        $("#createNewCourseButton").show(1);
        $('#addModal').modal('hide');
        $("#courseContainer").append(data);
      });
    },
    error: (data)=>{
      if(data.status==400){
        $("#addLoadingIcon").hide(1,()=>{$("#createNewCourseButton").show(1);});
        $("#addModal .alert-danger").text(data.responseJSON.message);
        $("#addModal .alert-danger").fadeIn();
      }
  }});
}

var deleteCourse = function(e){
  var mongo_id = e.attributes["mongo-id"].nodeValue;
  $.ajax({
    url:"course",
    method:"DELETE",
    contentType: "application/json",
    data:JSON.stringify({id:mongo_id}),
    success: (data)=>{
      $("#accordion"+mongo_id).parent().toggle("scale");
    },
    error: (data)=>{
      if(data.status==400){

        $("#addModal .alert-danger").text(data.responseJSON.message);
        $("#addModal .alert-danger").fadeIn();
      }
    }
  });
}

var modifyChunk = function(e){
  var chunk = {
    _id:$(e).attr("chunk-id"),
    validated:JSON.parse($(e).attr("newvalue")),
    adv_id:$(e).attr("adv-id")
  };

  $.ajax({
    url:"course/chunk",
    method:"POST",
    contentType: "application/json",
    data:JSON.stringify(chunk),
    success: (data)=>{
      var percentage = parseFloat($("#advbar-"+chunk.adv_id).css("width"));
      $("#advbar-"+chunk.adv_id).css("width",(percentage+parseFloat($("#advbar-"+chunk.adv_id).attr("chunk-val")*(chunk.validated?1:-1)))+"%");
      $(e).attr("newvalue",!JSON.parse($(e).attr("newvalue")));
    },
    error: (data)=>{
      if(data.status==400){
        console.log(data.message);
      }
    }
  });
}
