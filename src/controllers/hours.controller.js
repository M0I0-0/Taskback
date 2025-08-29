import supabase from "../lib/supabase.js";

export const getHours = async(req, res) =>{
    const {data,error} = await supabase.from("horas").select("*");
    if(error) return res.status(400).json({error: error.message});
    res.json(data);
};

export const CreteHour = async(req, res) =>{
    const {rango} = req.body;
    const {data,error} = await supabase.from("horas").insert([{rango}]).select();
    if(error) return res.status(400).json({error: error.message});
    res.json(data[0]);
};
