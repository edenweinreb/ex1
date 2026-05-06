#ifndef RECOMMEND_COMMAND_H
#define RECOMMEND_COMMAND_H

class RecommendCommand: public ICommand {
// TODO: Merge with AE-25 Branch
public:
void execute() override;
virtual ~RecommendCommand() {}

};

#endif