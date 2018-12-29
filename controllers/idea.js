const Idea = require('../models/Idea');


exports.ideaIndexPage = (req, res, next) => {
    Idea.find({user: req.user.id})
        .sort({createdAt: 'desc'})
        .then(ideas => {
            res.render('/ideas/index', {
                ideas
            })
        });
};

exports.addIdeaForm = (req, res, next) => {
  res.render('ideas/add');
};

exports.editIdea = (req, res, next) => {
  Idea.findOne({
      _id: req.params.id
  }).then(idea => {
      if(idea.user != req.user.id) {
          req.flash('error_msg', 'Not Authorized');
          res.redirect('/ideas');
      } else {
          res.render('ideas/edit', {
              idea: idea
          })
      }
  })
};

exports.deleteIdea  = (req, res, next) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'The idea removed');
            res.redirect('/ideas');
        })
};

exports.processForm = (req, res, next) => {
    let errors = [];

    if(!req.body.title) {
        errors.push({text: 'Please add a title'});
    }

    if(req.body.details) {
        errors.push({text: 'Please add some details'})
    }

    if(errors.length > 0 ) {
        res.render('/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newIdea = {
            title: req.body.title,
            details: req.body.details,
            user: req.user.id
        };
        new Idea(newIdea)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Video idea added');
                res.redirect('/ideas');
            })
    }
};


exports.editform = (req, res, next) => {
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {

        idea.title = req.body.title;
        idea.details = req.body.details;

        idea
            .save()
            .then((idea) => {
                req.flash('success_msg', 'Idea updated');
                res.redirect('/ideas');
            })
    });
};


