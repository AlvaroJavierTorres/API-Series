const { Router } = require('express');
const router = Router();
const guion = require('underscore');


const series = require('../sampleSeries.json');


router.get('/', (req, res) =>{
    res.json(series);
});

router.post('/', (req, res) => {
    const {titulo, genero, año, score} = req.body;
    if (titulo && genero && año && score ){
        const id = series.length + 1;
        const newSerie = {id, ...req.body};
        series.push(newSerie);
        res.json(series);
    }else{
       res.json({error: 'There was an error.'});
    }
    
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {titulo, genero, año, score} = req.body;
    if (titulo && genero && año && score ){
        guion.each(series, (serie, i) => {
            if(serie.id == id) {
                serie.titulo = titulo;
                serie.genero = genero;
                serie.año = año;
                serie.score = score;
            }
        });
        res.json(series);
    }else{
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    guion.each(series, (serie, i) => {
        if(serie.id == id) {
            series.splice(i, 1);
        }
    });
    res.send(series);
});

module.exports = router;