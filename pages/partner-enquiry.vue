<template>
    <div class="container">
        <div class="wrapper">
            <div class="row">
                <div class="col-md-7 left">
                    <h1>Partner with us today</h1>
                    <p>
                        And tap into a market consisting of hundreds of customers using our platform every month.
                    </p>
                </div>
                <div class="col-md-5 enquiry-form" style="">
                    <h2>Enquiry Form</h2>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="text" class="form-control" placeholder="Name" maxlength="50">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="text" class="form-control" placeholder="Surname" maxlength="50">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="email" class="form-control" placeholder="Email" maxlength="50">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-12">
                                <input type="tel" class="form-control" placeholder="Phone" maxlength="10">
                            </div>
                        </div>
                        <fieldset>
                            <legend>About the place</legend>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="text" class="form-control" placeholder="Name" maxlength="50">
                                </div>
                                <div class="col-sm-12">
                                    <textarea class="form-control" cols="30" rows="3" maxlength="200" placeholder="Address"></textarea>
                                </div>
                                <div class="col-sm-12">
                                    <input type="url" class="form-control" placeholder="Website" maxlength="100">
                                </div>
                                <div class="col-sm-6 pull-left" style="margin-top: 7px">
                                    <label class="input-container">Credit Card
                                        <input type="checkbox" class="form-control">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <div class="col-sm-6 pull-right" style="margin-top: 7px">
                                    <label class="input-container">Credit Card
                                        <input type="checkbox" >
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-group">
                            <div class="col-sm-2">
                                <button class="btn btn-lg">Submit <i class="fa fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .wrapper {
        padding: 2em;
    }

    .left {
        padding-top: 5%;
    }

    p {
        color: rgba(26, 27, 28, 0.877);
        font-size: 1.3em;
    }

    h1 {
        color: #1A1B1C;
        font-weight: bold;
        font-size: 2.5em;
    }

    .enquiry-form {
        padding: 2em; 
        background-color: #F64747; 
        color: #fff;
    }

    input, textarea {
        background: rgba(255, 255, 255, 0.075) !important;
        color: #fff !important;
    }

    input:focus, textarea:focus {
        border: 1px solid rgba(255, 255, 255, 0.904) !important;
    }

    button {
        background-color: transparent !important;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.25);
        color: #ffffff !important;
    }

    ::-moz-placeholder {
        color: #fff;
        font-weight: bold;
    }

    ::-webkit-input-placeholder {
        color: #fff;
        font-weight: bold;
    }
</style>
