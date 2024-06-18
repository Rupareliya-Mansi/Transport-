const asyncHandler = require("../middelware/async");
const luggage = require("../model/luggage");

exports.addLuggage = asyncHandler(async (req, res, next) => {
  req.body.sendre_id = req.uId;

  const add_items = await luggage.create(req.body);

  res.send({
    data: add_items,
  });
});

exports.find_luggage = asyncHandler(async (req, res, next) => {
  const data = await luggage.findOne({
      sendre_id : req.uId,
      _id: req.params.id,
  })
  res.send({
    data:data
  })

})


exports.updateluggage = asyncHandler(async (req, res, next) => {
 const updatedata = await luggage.findOneAndUpdate(
    {
      sendre_id : req.uId,
      _id: req.params.id,
    },
    req.body,
    {
      returnDocument: "after",
    }
  );
  res.send({
    data:updatedata ,
  });
});



exports.luggage_pegination = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const start_data = (page - 1) * limit;
  console.log(start_data);

  const data = await luggage.find().skip(start_data).limit(limit);
  const totalData = await luggage.find().countDocuments();
  const totalPage = Math.ceil(totalData / limit);
  console.log(totalPage);

  res.json({
    totalPage,
    totalData,
    page,
    pagedata: limit,
    data,
  });
};

exports.deleteluggage = asyncHandler(async (req, res, next) => {
  delete_data = await luggage.deleteOne({
    _id: req.params.id,
  });
  res.send({
    message : "Successfully removed luggage documents"
  })
});

exports.Multiple_luggage_delete= asyncHandler(async (req, res, next) => {
    const ids = req.body.id ;
    const idArray = Array.isArray(ids) ? ids : ids.split(',');
  
    const deletedCount = await luggage.deleteMany({ _id: { $in: idArray } });
    if(deletedCount.deletedCount == 0)
    {
      res.send({
        message : "invalid ObjectIDs provided"
      })
    }
    res.send({
      message: `Successfully removed ${deletedCount.deletedCount}  luggage documents`,
    });
 
});
