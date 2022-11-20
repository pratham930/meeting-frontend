import { Box } from '@mui/material';
import React,{useState} from 'react';
import { styled } from '@mui/material/styles';
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Alert,
     InputLabel, MenuItem, Select, FormControl, FormLabel,FormGroup, Stack } from '@mui/material';


const CreateMeeting = () => {

    const Input = styled('input')({
        display: 'none',
      });

   
    



    const [name, setName] = useState()
    const [quantity, setquantity] = useState()
    const [Category, setCategory] = useState('')
    const [startTime, setstartTime] = useState()
    const [Subcategory, setSubcategory] = useState()
    const [endTime, setendTime] = useState()
   
    const [error, setError] = useState({
      status: false,
      msg: "",
      type: ""
    })

  const resetForm = () => {
    setName('')
    setquantity('')
    // category('')
    setCategory('')
    setstartTime('')
    setendTime('')
   
    setSubcategory('')
    document.getElementById('resume-form').reset()

  }
console.log(name,startTime,endTime,'44')



      
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name', name)
    data.append('startTime', startTime)
    data.append('endTime', endTime)
    // data.append('Subcategory', Subcategory)
    // data.append('Category', Category)
    // data.append('quantity', quantity)
    

    if (name && startTime) {
   
      setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
      resetForm()
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }
  return (

    <>
<Box>
<Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 1 }}>
        <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Meeting details</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField id="name" name="name" required fullWidth margin='normal' label='ClassName' onChange={(e) => setName(e.target.value)} />
            {/* <TextField id="email" quantity="quantity" required fullWidth margin='normal' label='quantity' onChange={(e) => setquantity(e.target.value)} /> */}
                                        
           
{/* 
              <FormControl fullWidth margin='normal'>
              <InputLabel id="state-select-label">Class</InputLabel>
              <Select labelId='state-select-label' id='state-select' value={Category} label='class' onChange={(e) => { setCategory(e.target.value) }}>
              
           

                <MenuItem value="electronics">8th</MenuItem>
                <MenuItem value="grocery">9th</MenuItem>
                <MenuItem value="fashion">10th</MenuItem>
                <MenuItem value="beauty">11th</MenuItem>
                <MenuItem value="jewellery">12th</MenuItem>
                


              </Select>

            </FormControl> */}

            {/* <FormControl fullWidth margin='normal'>
              <InputLabel id="state-select-label">SubCategory</InputLabel>
              <Select labelId='state-select-label' id='state-select' value={Subcategory} label='Category' onChange={(e) => { setSubcategory(e.target.value) }}>
               
                   
              { Data && Data.categoryList && Data.categoryList.map(({children})=>  
              children.map(({name,_id})=> 
              <MenuItem key={_id} value={name} >{name}</MenuItem>)
            ) 
            }

                <MenuItem value="mobile">mobile</MenuItem>
                <MenuItem value="tablet">tablet</MenuItem>
                <MenuItem value="computer">computer</MenuItem>
                <MenuItem value="cameras">cameras</MenuItem>
                <MenuItem value="gaming">gaming</MenuItem>
              
              </Select>

            </FormControl> */}




            <FormControl fullWidth margin='normal'>
              {/* <FormLabel id="gender-radio">startTime</FormLabel> */}
              <TextField id="email" startTime="startTime" required fullWidth margin='normal' label='startTime' onChange={(e) => setstartTime(e.target.value)} />
            </FormControl>
            {/* <FormControl fullWidth margin='normal'>
            <FormLabel id="gender-radio">specification</FormLabel>
              <TextField id="email" categoty="categoty" required fullWidth margin='normal' label='category' onChange={(e) => setcategory(e.target.value)} />
              </FormControl> */}
              <FormControl fullWidth margin='normal'>
            {/* <FormLabel id="gender-radio">endTime</FormLabel> */}
              <TextField id="email" endTime="endTime" required fullWidth margin='normal' label='endTime' onChange={(e) => setendTime(e.target.value)} />
              </FormControl>
           

            {/* <FormControl component='fieldset' fullWidth margin='normal'>
              <FormLabel component='legend'>Preferred Job Location:</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="Delhi" value="Delhi" onChange={(e) => getPjl(e)} /> 
                <FormControlLabel control={<Checkbox />} label="Mumbai" value="Mumbai" onChange={(e) => getPjl(e)} />
                <FormControlLabel control={<Checkbox />} label="Banglore" value="Banglore" onChange={(e) => getPjl(e)} />
                <FormControlLabel control={<Checkbox />} label="Ranchi" value="Ranchi" onChange={(e) => getPjl(e)} />
                <FormControlLabel control={<Checkbox />} label="Kolkata" value="Kolkata" onChange={(e) => getPjl(e)} />
              </FormGroup>
            </FormControl> */}
            {/* <Stack direction="row" alignItems="center" spacing={4} >
              <label htmlFor='profile-photo'>
                <Input accept="image/*" id="profile-photo" type="file" onChange={(e) => { setPimage(e.target.files[0]) }} />
                <Button variant='contained' component='span'>Upload Photo </Button>
              </label>
              <label htmlFor="resume-file">
                <Input accept="doc/*" id="resume-file" type="file" onChange={(e) => { setRdoc(e.target.files[0]) }} />
                <Button variant="contained" component="span">Upload File</Button>
              </label>
            </Stack> */}
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>

    
      </Grid>


</Box>


    </>
  )
}

export default CreateMeeting ;