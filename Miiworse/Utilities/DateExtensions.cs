using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Miiworse.Utilities
{
    public static class DateExtensions
    {
        public static DateTime FromUnixTime(this long unixTime)
        {
            var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Local);
            return epoch.AddSeconds(unixTime);
        }

        public static long ToUnixTime(this DateTime date)
        {
            var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Local);
            return Convert.ToInt64((date - epoch).TotalSeconds);
        }
    }
}
