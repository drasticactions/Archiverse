using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiiverseDatabase.Entities
{
    public static class GameSkillHelper
    {
        private const string IntermediateLevel = "intermediate";
        private const string ExpertLevel = "expert";
        private const string CasualLevel = "casual";
        private const string BeginnerLevel = "beginner";

        public static GameSkill DetectGameSkillFromClassName(string className)
        {
            switch (className)
            {
                case IntermediateLevel:
                    return GameSkill.Intermediate;
                case ExpertLevel:
                    return GameSkill.Expert;
                case CasualLevel:
                    return GameSkill.Casual;
                case BeginnerLevel:
                    return GameSkill.Beginner;
                default:
                    return GameSkill.Hidden;
            }
        }
    }
}
