import React from 'react'

export default function Calender() {
    return (
        <div className="col-md-6">
            <div className="calendar_area">
                <div className="calendar">

                    <header>
                
                    <h2>April 2021</h2>
                
                    <a className="btn-prev" href="#"><img src="/images/left_arrow_3.png" alt="" /></a>
                    <a className="btn-next" href="#"><img src="/images/right_arrow_3.png" alt="" /></a>
                
                    </header>
                
                    <table className="w-100">
                
                    <thead>
                
                        <tr>
                
                        <td>MON</td>
                        <td>TUE</td>
                        <td>WED</td>
                        <td>THU</td>
                        <td>FRI</td>
                        <td>SAT</td>
                        <td>SUN</td>
                
                        </tr>
                
                    </thead>
                
                    <tbody>
                
                        <tr>
                            <td className="prev-month"><span>26</span> </td>
                            <td className="prev-month"><span>27</span></td>
                            <td className="prev-month"><span>28</span></td>
                            <td className="prev-month"><span>29</span></td>
                            <td className="prev-month"><span>30</span></td>
                            <td className="prev-month"><span>31</span></td>
                            <td><span>1</span></td>
                        </tr>
                        <tr>
                            <td><span>2</span></td>
                            <td><span>3</span></td>
                            <td><span>4</span></td>
                            <td><span>5</span></td>
                            <td><span>6</span></td>
                            <td><span>7</span></td>
                            <td><span>8</span></td>
                        </tr>
                        <tr>
                            <td><span>9</span></td>
                            <td className="event"><span>10</span></td>
                            <td><span>11</span></td>
                            <td><span>12</span></td>
                            <td><span>13</span></td>
                            <td><span>14</span></td>
                            <td><span>15</span></td>
                        </tr>
                        <tr>
                            <td><span>16</span></td>
                            <td><span>17</span></td>
                            <td><span>18</span></td>
                            <td><span>19</span></td>
                            <td><span>20</span></td>
                            <td className="event"><span>21</span></td>
                            <td><span>22</span></td>
                        </tr>
                
                        <tr>
                            <td className="current-day event mob_d_none"><span><a href="complimentary_meeting_step1.html">23</a></span></td>
                            <td className="current-day event dsk_d_none"><span><a href="complimentary_meeting_step1-mob.html">23</a></span></td>
                            <td><span>24</span></td>
                            <td><span>25</span></td>
                            <td><span>26</span></td>
                            <td><span>27</span></td>
                            <td><span>28</span></td>
                            <td><span>29</span></td>
                        </tr>
                        <tr>
                            <td><span>30</span></td>
                            <td className="next-month"><span>1</span></td>
                            <td className="next-month"><span>2</span></td>
                            <td className="next-month"><span>3</span></td>
                            <td className="next-month"><span>4</span></td>
                            <td className="next-month"><span>5</span></td>
                            <td className="next-month"><span>6</span></td>
                        </tr>
                
                    </tbody>
                
                    </table>
                
                </div> 
            </div>
        </div>
    )
}
